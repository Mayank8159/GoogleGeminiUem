const connectDB = async () => {
  try {
    if (!process.env.AWS_REGION) {
      throw new Error('AWS_REGION is required');
    }

    console.log('✅ DynamoDB configuration loaded');
    return true;
  } catch (err) {
    console.error('❌ DynamoDB initialization failed:', err.message);
    throw err;
  }
};

export default connectDB;