import Request from '../request.js';
import Validator from './validator.js';

class MetanetAPI {
    constructor(domain) {
        this.domain = domain;
        this.validator = new Validator();
        this.request = new Request();
        this.authToken = null; // You might need to handle authentication if required.
    }

    setAuthToken(token) {
        this.authToken = token;
    }

    getAuthToken() {
        return this.authToken;
    }

    async validate() {
        if (!this.authToken) {
            throw new Error('You must be logged in. Try calling setAuthToken() method first.');
        }
    }

    /**
     * Create a new Metanet node.
     *
     * @param {string} nodeName - Name of the new node.
     * @param {string} parentTxID - TxID of the parent node.
     * @param {string} parentSignature - Signature of the parent node.
     * @param {boolean} bitcoinValid - Whether the data is Bitcoin valid.
     * @param {boolean} metanetValid - Whether the data is Metanet valid.
     * @throws {Error} Throws an error if the request fails or the data is not valid.
     * @return {Object} The response if successful.
     */

    async createMetanetNode(nodeName, parentTxID, parentSignature, bitcoinValid, metanetValid) {
        try {
            await this.validate();
            await this.validator.createMetanetNode({ nodeName, parentTxID, parentSignature });

            if (!bitcoinValid) {
                throw new Error('Data is not Bitcoin valid.');
            }

            if (!metanetValid) {
                throw new Error('Data is not Metanet valid.');
            }

            const endpoint = '/metanet/createNode';

            const requestHeaders = {
                'Authorization': this.getAuthToken(),
            };

            const requestBody = {
                nodeName,
                parentTxID,
                parentSignature,
            };

            const response = await this.request.postRequest(endpoint, requestBody, requestHeaders);

            if (response instanceof Error) {
                throw response;
            }

            return response;
        } catch (error) {
            throw new Error('Metanet node creation failed: ' + error);
        }
    }
    

    /**
     * Get information about a specific Metanet node.
     *
     * @param {string} nodeTxID - TxID of the Metanet node.
     * @throws {Error} Throws an error if the request fails.
     * @return {Object} The response if successful.
     */
    async getMetanetNode(nodeTxID) {
        try {
            await this.validate();
            await this.validator.getMetanetNode({ nodeTxID });

            const endpoint = '/metanet/getNodeInfo';

            const requestHeaders = {
                'Authorization': this.getAuthToken(),
            };

            const requestBody = {
                nodeTxID,
            };

            const response = await this.request.postRequest(endpoint, requestBody, requestHeaders);

            if (response instanceof Error) {
                throw response;
            }

            return response;
        } catch (error) {
            throw new Error('Get Metanet node failed: ' + error);
        }
    }

    /**
     * Delete a Metanet node.
     *
     * @param {string} nodeTxID - TxID of the Metanet node to delete.
     * @throws {Error} Throws an error if the request fails.
     * @return {Object} The response if successful.
     */
    async deleteMetanetNode(nodeTxID) {
        try {
            await this.validate();
            await this.validator.deleteMetanetNode({ nodeTxID });

            const endpoint = '/metanet/deleteNode';

            const requestHeaders = {
                'Authorization': this.getAuthToken(),
            };

            const requestBody = {
                nodeTxID,
            };

            const response = await this.request.postRequest(endpoint, requestBody, requestHeaders);

            if (response instanceof Error) {
                throw response;
            }

            return response;
        } catch (error) {
            throw new Error('Delete Metanet node failed: ' + error);
        }
    }

    /**
     * List Metanet nodes within a specified domain or subtree.
     *
     * @param {string} domain - The domain or subtree to list nodes from.
     * @throws {Error} Throws an error if the request fails.
     * @return {Object} The response if successful.
     */
    async listMetanetNodes(domain) {
        try {
            await this.validate();
            await this.validator.listMetanetNodes({ domain });

            const endpoint = '/metanet/listNodes';

            const requestHeaders = {
                'Authorization': this.getAuthToken(),
            };

            const requestBody = {
                domain,
            };

            const response = await this.request.postRequest(endpoint, requestBody, requestHeaders);

            if (response instanceof Error) {
                throw response;
            }

            return response;
        } catch (error) {
            throw new Error('List Metanet nodes failed: ' + error);
        }
    }

    /**
     * Find all descendants of a specific Metanet node.
     *
     * @param {string} nodeTxID - TxID of the Metanet node.
     * @throws {Error} Throws an error if the request fails.
     * @return {Object} The response if successful.
     */
    async findAllDescendants(nodeTxID) {
        try {
            await this.validate();
            await this.validator.findAllDescendants({ nodeTxID });

            const endpoint = '/metanet/findAllDescendants';

            const requestHeaders = {
                'Authorization': this.getAuthToken(),
            };

            const requestBody = {
                nodeTxID,
            };

            const response = await this.request.postRequest(endpoint, requestBody, requestHeaders);

            if (response instanceof Error) {
                throw response;
            }

            return response;
        } catch (error) {
            throw new Error('Find all descendants failed: ' + error);
        }
    }

    /**
     * Find all ancestors of a specific Metanet node.
     *
     * @param {string} nodeTxID - TxID of the Metanet node.
     * @throws {Error} Throws an error if the request fails.
     * @return {Object} The response if successful.
     */
    async findAllAncestors(nodeTxID) {
        try {
            await this.validate();
            await this.validator.findAllAncestors({ nodeTxID });

            const endpoint = '/metanet/findAllAncestors';

            const requestHeaders = {
                'Authorization': this.getAuthToken(),
            };

            const requestBody = {
                nodeTxID,
            };

            const response = await this.request.postRequest(endpoint, requestBody, requestHeaders);

            if (response instanceof Error) {
                throw response;
            }

            return response;
        } catch (error) {
            throw new Error('Find all ancestors failed: ' + error);
        }
    }

    /**
     * Transfer ownership of a Metanet node to another user.
     *
     * @param {string} nodeTxID - TxID of the Metanet node to transfer ownership.
     * @param {string} newOwnerPublicKey - Public key of the new owner.
     * @throws {Error} Throws an error if the request fails.
     * @return {Object} The response if successful.
     */
    async transferOwnership(nodeTxID, newOwnerPublicKey) {
        try {
            await this.validate();
            await this.validator.transferOwnership({ nodeTxID, newOwnerPublicKey });

            const endpoint = '/metanet/transferOwnership';

            const requestHeaders = {
                'Authorization': this.getAuthToken(),
            };

            const requestBody = {
                nodeTxID,
                newOwnerPublicKey,
            };

            const response = await this.request.postRequest(endpoint, requestBody, requestHeaders);

            if (response instanceof Error) {
                throw response;
            }

            return response;
        } catch (error) {
            throw new Error('Transfer ownership failed: ' + error);
        }
    }
}

export default MetanetAPI;
