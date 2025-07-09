// src/fileIO.js
/**
 * File I/O operations
 */

const fs = require('fs').promises;
const path = require('path');
const logger = require('./logger');

/**
 * Read and parse file based on extension
 * @param {string} filePath Path to file
 * @returns {Promise<any>} Parsed content
 */
async function readFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    
    try {
        const content = await fs.readFile(filePath, 'utf8');
        
        if (ext === '.json') {
            return JSON.parse(content);
        } else if (ext === '.csv') {
            const lines = content.split('
');
            const headers = lines[0].split(',');
            return lines.slice(1).map(line => {
                const values = line.split(',');
                return headers.reduce((obj, header, i) => {
                    obj[header] = values[i];
                    return obj;
                }, {});
            });
        }
        
        return content;
    } catch (error) {
        logger.error(`File read error: ${error.message}`);
        throw error;
    }
}

/**
 * Write data to file based on extension
 * @param {string} filePath Output path
 * @param {any} data Data to write
 * @returns {Promise<void>}
 */
async function writeFile(filePath, data) {
    const ext = path.extname(filePath).toLowerCase();
    
    try {
        let content;
        if (ext === '.json') {
            content = JSON.stringify(data, null, 2);
        } else if (ext === '.csv') {
            if (!Array.isArray(data) || data.length === 0) {
                throw new Error('Cannot convert non-array or empty data to CSV');
            }
            
            const headers = Object.keys(data[0]);
            const rows = data.map(item => 
                headers.map(header => item[header]).join(',')
            );
            content = [headers.join(','), ...rows].join('
');
        } else {
            content = String(data);
        }
        
        await fs.writeFile(filePath, content);
    } catch (error) {
        logger.error(`File write error: ${error.message}`);
        throw error;
    }
}

module.exports = {
    readFile,
    writeFile
};
