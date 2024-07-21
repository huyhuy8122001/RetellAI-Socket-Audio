module.exports = {
  apps : [{
    name: 'retellai-shim',
    script: 'app.js',
    instance_var: 'INSTANCE_ID',
    exec_mode: 'fork',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      LOGLEVEL: 'info',
      HTTP_PORT: 3000,
      JAMBONZ_ACCOUNT_SID: 'your_account_sid',
      JAMBONZ_API_KEY: 'your_api_key',
      JAMBONZ_REST_API_BASE_URL: 'https://jambonz.cloud/api/v1', // or replace with your own jambonz instance URL
      RETELL_API_KEY: 'your_retell_api_key',
      RETELL_AGENT_ID: 'your_retell_agent_id',
      WS_URL: 'wss://your_ngrok_or_other_domain_where_this_app_is_running',
      // optional: if you want to use call transfer, set the following:
      TRANSFER_NUMBER: '16176354500', // replace with the phone number to which calls should be transferred 
      TRANSFER_USING_REFER: 1,  // set to 1 to use REFER, 0 to use INVITE 
      CALLER_ID: '16173333456', // replace with caller id to use on INVITE (default to inbound caller id)
    }
  }]
};
