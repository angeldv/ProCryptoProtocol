// src/core.js
/**
 * Core processing logic for ProCryptoProtocol
 */

const { readFile, writeFile } = require('./fileIO');
const logger = require('./logger');

class Processor {
    /**
     * Create a new Processor instance
     * @param {object} config Configuration options
     */
    constructor(config) {
        this.config = config;
    }
    
    /**
     * Validate input configuration
     * @returns {Promise<boolean>} True if valid
     */
    async validate() {
        if (this.config.input) {
            try {
                await readFile(this.config.input);
                return true;
            } catch (error) {
                logger.error(`Input validation failed: ${error.message}`);
                return false;
            }
        }
        return true;
    }
    
    /**
     * Process data according to configuration
     * @returns {Promise<any>} Processing result
     */
    async process() {
        logger.debug('Starting data processing');
        
        try {
            let data = await readFile(this.config.input);
            data = this.transform(data);
            
            if (this.config.output) {
                await writeFile(this.config.output, data);
                return true;
            }
            
            return data;
        } catch (error) {
            logger.error(`Processing error: ${error.message}`);
            throw error;
        }
    }
    
    /**
     * Transform data according to business rules
     * @param {any} data Input data
     * @returns {any} Transformed data
     */
    transform(data) {
        // Default transformation - can be overridden
        if (typeof data === 'object' && data !== null) {
            const result = {};
            for (const key in data) {
                result[key.toLowerCase()] = data[key];
            }
            return result;
        }
        return data;
    }
    
    /**
     * Execute full processing pipeline
     * @returns {Promise<any>} Final result
     */
    async run() {
        if (!(await this.validate())) {
            return false;
        }
        return this.process();
    }
}

module.exports = {
    Processor
};
