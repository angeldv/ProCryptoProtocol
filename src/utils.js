// src/utils.js
/**
 * Utility functions for ProCryptoProtocol
 */

const logger = require('./logger');

/**
 * Transform data keys to lowercase
 * @param {object|array} data Input data
 * @returns {object|array} Transformed data
 */
function transform(data) {
    if (Array.isArray(data)) {
        return data.map(item => transform(item));
    } else if (typeof data === 'object' && data !== null) {
        const result = {};
        for (const key in data) {
            result[key.toLowerCase()] = data[key];
        }
        return result;
    }
    return data;
}

/**
 * Validate email address format
 * @param {string} email Email to validate
 * @returns {boolean} True if valid
 */
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}

/**
 * Generate hash of input data
 * @param {string} data Input string
 * @param {string} [algorithm='sha256'] Hash algorithm
 * @returns {string} Hexadecimal hash
 */
function generateHash(data, algorithm = 'sha256') {
    const crypto = require('crypto');
    return crypto.createHash(algorithm)
        .update(data)
        .digest('hex');
}

module.exports = {
    transform,
    validateEmail,
    generateHash
};
