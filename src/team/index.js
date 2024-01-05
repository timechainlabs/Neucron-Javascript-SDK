import Request from '../request.js';

class Team {

  constructor(auth) {
	this.auth = auth;
	this.request = new Request();
  }

  async validate() {
	if (!this.auth.getAuthToken()) {
	  throw new Error('You must logged In. Try calling auth() method first');
	}
  }

  //TODO: Implement these endpoints: { xPubKeys, setDefaultTeam, getMnemonic}

  /**
   * Lets a user create team with email, team_name and team_desc.
   * @param {string} options.team_desc - team_desc of team.
   * @param {string} options.email - email of team.
   * @param {string} options.team_name - team_name of team.
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async createTeam(options) {
	try {
	  // Validate the SDK state
	  await this.validate();
  
	  // Ensure the walletName is provided
	  if (!options.team_name && !options.team_desc && !options.email) {
		throw new Error('Team name , Team desc & email is required for team creation.');
	  }

	  const endpoint = '/team';
  
	  const requestBody = {
        "email": options.email,
        "team_desc": options.team_desc,
        "team_name": options.team_name
      };
  
	  const requestHeaders = {
		Authorization: this.auth.getAuthToken(),
	  };

  
	  // Make the POST request to create the wallet
	  const response = await this.request.postRequest(endpoint, requestBody, requestHeaders);
  
	  // Handle errors, if any
	  if (response instanceof Error) {
		throw response;
	  }
  
	  // Return the wallet ID from the response data
	  return await response;
	} catch (error) {
	  throw new Error('Wallet creation failed: ' + error);
	}
  }

  /**
   * Lets a user update team with  name and desc.
   * @param {string} options.business_address - team_desc of team.
   * @param {string} options.business_name - team_name of team.
   * @param {string} options.business_type - team_desc of team.
   * @param {string} options.cin_number - team_name of team.
   * @param {string} options.digi_signature - team_desc of team.
   * @param {string} options.id_prov_public_key - team_name of team.
   * @param {string} options.jurisdiction - team_desc of team.
   * @param {string} options.merchant_code - team_name of team.
   * @param {string} options.uid - team_name of team.
   * @param {string} options.teamId - team_name of team.
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async updateTeamKyb(options) {
    try {
      // Validate the SDK state
      await this.validate();
  
    //   // Ensure the walletName is provided
    //   if (!options.name && !options.desc) {
    //     throw new Error('Team name , Team desc  is required for team updation.');
    //   }

      const endpoint = '/team/kyb';
  
      const requestBody = {
        "business_address": options.business_address,
        "business_name": options.business_name,
        "business_type": options.business_type,
        "cin_number": options.cin_number,
        "digi_signature": options.digi_signature,
        "id_prov_public_key": options.id_prov_public_key,
        "jurisdiction": options.jurisdiction,
        "merchant_code": options.merchant_code,
        "uid": options.uid
      };
  
      const requestHeaders = {
        Authorization: this.auth.getAuthToken(),
      };

      const requestUrl = endpoint + '?' + 'teamID=' + options.teamId;
      // Make the POST request to create the wallet
      const response = await this.request.postRequest(requestUrl, requestBody, requestHeaders);
  
      // Handle errors, if any
      if (response instanceof Error) {
        throw response;
      }
  
      // Return the wallet ID from the response data
      return await response;
    } catch (error) {
      throw new Error('Wallet creation failed: ' + error);
    }
  }

    /**
   * Lets a user to get Team KYB Detail
   * @param {string} [options.teamId] .
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
    async getTeamKybDetail(options) {

        try {
          await this.validate();
    
          const endpoint = '/team/kyb';
          const requestHeaders = {
            Authorization: this.auth.getAuthToken()
          };
    
          const requestUrl = endpoint + '?' + 'teamID=' + options.teamId;
          const response = await this.request.getRequest(requestUrl, requestHeaders);
    
          if (response instanceof Error) {
            throw response;
          }
          return response;
        } catch (error) {
          throw new Error('Authentication request failed: ' + error);
        }
      }

    /**
   * Lets a user update team with  name and desc.
   * @param {string} options.desc - team_desc of team.
   * @param {string} options.name - team_name of team.
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
    async updateTeam(options) {
        try {
          // Validate the SDK state
          await this.validate();
      
          // Ensure the walletName is provided
          if (!options.name && !options.desc) {
            throw new Error('Team name , Team desc  is required for team updation.');
          }
    
          const endpoint = '/team';
      
          const requestBody = {
            "email": options.email,
            "team_desc": options.team_desc,
            "team_name": options.team_name
          };
      
          const requestHeaders = {
            Authorization: this.auth.getAuthToken(),
          };
    
      
          // Make the POST request to create the wallet
          const response = await this.request.postRequest(endpoint, requestBody, requestHeaders);
      
          // Handle errors, if any
          if (response instanceof Error) {
            throw response;
          }
      
          // Return the wallet ID from the response data
          return await response;
        } catch (error) {
          throw new Error('Wallet creation failed: ' + error);
        }
      }
  

  /**
   * Lets a user to get Team Detail
   * @param {string} [options.teamId] .
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async getTeamDetail(options) {

	try {
	  await this.validate();

	  const endpoint = '/team';
      const requestHeaders = {
		Authorization: this.auth.getAuthToken()
	  };

      const requestUrl = endpoint + '?' + 'teamID=' + options.teamId;
      console.log(requestUrl, endpoint )
	  const response = await this.request.getRequest(endpoint, requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }
	  return response;
	} catch (error) {
	  throw new Error('Authentication request failed: ' + error);
	}
  }

    /**
   * Lets a user to get Team List
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
    async getTeamList() {

        try {
          await this.validate();
    
          const endpoint = '/team/list';
          const requestHeaders = {
            Authorization: this.auth.getAuthToken()
          };

          const response = await this.request.getRequest(endpoint, requestHeaders);
    
          if (response instanceof Error) {
            throw response;
          }
          return response;
        } catch (error) {
          throw new Error('Get Team List ' + error);
        }
      }

  /**
   * get transaction history of corresponding TeamId if not passed then default Team transaction history will return
   * @param {string} [options.TeamId] - using this mnemonic user can create an Team (optional).
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async getTeamHistory(options) {
	try {
	  await this.validate();

	  let endpoint = '/Team/history';

	  let requestHeaders = {
		Authorization: this.auth.getAuthToken()
	  };

	  if (options && options.TeamId){

		endpoint += `?TeamID=${options.TeamId}`;
	  }

	  const response = await this.request.getRequest(endpoint, requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }
	  return response.data.history;
	} catch (error) {
	  throw new Error('Unable to fetch transaction history: ' + error);
	}
  }

  /**
   * get Team balance if Team is not passed then default Team balance will be returned
   * @param {string} [options.TeamId] - using this mnemonic user can create an Team (optional).
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async getTeamBalance(options) {
	try {
	  await this.validate();

	  let endpoint = '/Team/balance';

	  if (options && options.TeamId){

		endpoint += `?TeamID=${options.TeamId}`;
	  }

	  const requestHeaders = {
		Authorization: this.auth.getAuthToken()
	  };

	  const response = await this.request.getRequest(endpoint, requestHeaders);
	  if (response instanceof Error) {
		throw response;
	  }

	  return response;
	} catch (error) {
	  throw new Error('Processing failed: ' + error);
	}
  }

  /**
   * get Team addresses if Team is not passed then default Team addresses will be returned
   * @param {string} [options.TeamId] - using this mnemonic user can create an Team (optional).
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async getAddressesByTeamId(options) {
	try {
	  await this.validate();


	  const endpoint = '/Team/address';
	  let requestUrl = endpoint;

		let requestHeaders = {
		Authorization: this.auth.getAuthToken()
	  };

	  if (options && options.TeamId){
		requestUrl += `?TeamID=${options.TeamId}`;
	  }

	  const response = await this.request.getRequest(requestUrl, requestHeaders);
	  if (response instanceof Error) {
		throw response;
	  }

	  return response;
	} catch (error) {
	  throw new Error('Processing failed: ' + error);
	}
  }

  /**
   * recover Team address using path of that address if Team id is not passed then it will take default TeamId
   * @param {string} [query.TeamId] - Team Id (optional).
   * @param {string} query.path - path of that address you want to recover (optional).
   * @param {string} headers.Content-Type - The content type of the request (Content-Type header).
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async getTeamAddressByPath(headers,query) {
	// TODO: R&D Pending in Neucron
	try {
	  await this.validate();
	  await this.validator.getTeamAddressByPath(query);

	  const endpoint = '/Team/address/create';

	  let requestHeaders = {
		'Content-Type': headers['Content-Type'],
	  };

	  const response = await this.request.getRequest(endpoint, requestHeaders, query);
	  if (response instanceof Error) {
		throw response;
	  }

	  return response;
	} catch (error) {
	  throw new Error('Processing failed: ' + error);
	}
  }

  /**
   * get keys of corresponding TeamId if not passed then default Team keys will return
   * @param {string} [options.TeamId] - TeamId of the user he want to run options on.
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async getTeamKeys(options) {
	try {
	  await this.validate();

	  let endpoint = '/Team/keys';

	  const requestHeaders = {
		Authorization: this.auth.getAuthToken()
	  };

	  if (options && options.TeamId){
		endpoint += `?TeamID=${options.TeamId}`;
	  }

	  const response = await this.request.getRequest(endpoint, requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }
	  return response.data.keys;
	} catch (error) {
	  throw new Error('Unable to fetch keys : ' + error);
	}
  }

  /**
   * return list of Teams
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async getAllTeam() {
	try {
	  await this.validate();

	  const endpoint = '/Team/list';

	  let requestHeaders = {
		Authorization: this.auth.getAuthToken()
	  };

	  const response = await this.request.getRequest(endpoint, requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }
	  return response.data.details.Teams;
	} catch (error) {
	  throw new Error('Unable to fetch Team Ids : ' + error);
	}
  }

  /**
   * return list of utxos
   * @param {string} [options.TeamId] - TeamId of the user he want to run options on if not present then all utxos will return of user.
   * @throws {Error} Throws an error if the transaction request fails.
   * @return {Object} The headers of the response if successful.
   */
  async getAllUtxos(options) {
	try {
	  await this.validate();

	  let endpoint = '/Team/utxo';

	  const requestHeaders = {
		Authorization: this.auth.getAuthToken()
	  };

	  if (options && options.TeamId){
		endpoint += `?TeamID=${options.TeamId}`;
	  }

	  const response = await this.request.getRequest(endpoint, requestHeaders);

	  if (response instanceof Error) {
		throw response;
	  }
	  return response.data.list;
	} catch (error) {
	  throw new Error('Unable to fetch keys : ' + error);
	}
  }
}

export default Team;
