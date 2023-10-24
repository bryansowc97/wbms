export const environment = {
  api: {
    booking: 'http://localhost:8081/api/booking', // Base URL for local development
    workspace: 'http://localhost:8082/api/workspace',
    // workspace: 'http://localhost:8083/api/workspace', // Base URL for local development
  },
  cognito: {
    userPoolId: 'ap-southeast-1_Djqfxom8g',
    userPoolWebClientId: '2cdd2pljhkusppja7dh3m4ddrq',
  },
  awsConfig:  { 
    region: 'ap-southeast-1', 
    identitiyPoolId: 'ap-southeast-1:bd9a5a4f-10e2-4f15-98ce-ba67670e1c1d', 
  }
}

