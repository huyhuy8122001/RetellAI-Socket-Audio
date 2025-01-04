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
        JAMBONZ_ACCOUNT_SID: "f47b9d2a-1e01-4d4f-aa49-c01a29825947",
        JAMBONZ_API_KEY: "2cb46e86-c980-42bf-a610-e1a29f81d0cd",
        JAMBONZ_REST_API_BASE_URL: "https://jambonz.cloud/api/v1", // or replace with your own self-hosted jambonz URL
        RETELL_API_KEY: "key_5070255a9c39b2e2fe626b4721ae",
        RETELL_AGENT_ID: "agent_cd9b17ee2407028ae999eee50c",
        WS_URL: "wss://a512-123-20-137-154.ngrok-free.app",
      },
    },
  ],
};
