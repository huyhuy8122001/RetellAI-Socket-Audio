module.exports = {
  apps: [
    {
      name: "retellai-shim",
      script: "app.js",
      instance_var: "INSTANCE_ID",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        LOGLEVEL: "info",
        HTTP_PORT: 3000,
        JAMBONZ_ACCOUNT_SID: "57845ebf-a824-4579-910f-24256bad9ea2",
        JAMBONZ_API_KEY: "72f39cc8-6a85-4082-82b0-97d5de9bf969",
        JAMBONZ_REST_API_BASE_URL: "https://jambonz.cloud/api/v1", // or replace with your own self-hosted jambonz URL
        RETELL_API_KEY: "key_5070255a9c39b2e2fe626b4721ae",
        RETELL_AGENT_ID: "agent_cd9b17ee2407028ae999eee50c",
        WS_URL: "wss://451f-14-187-191-15.ngrok-free.app",
      },
    },
  ],
};
