import { loadCsvData, saveTestResult } from '../services/terrorservices.js';


export const getCsvData = async (req, res) => {
  try {
    const page = 1;
    const limit = 50;
    
    const result = await loadCsvData(page, limit);
    res.status(200).json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Error in getCsvData:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};


export const saveResult = async (req, res) => {
  try {
    const { score } = req.body;
    
    if (score === undefined || score === null) {
      return res.status(400).json({
        success: false,
        error: 'Score is required'
      });
    }
    
    if (typeof score !== 'number' || score < 0) {
      return res.status(400).json({
        success: false,
        error: 'Score must be a valid positive number'
      });
    }
    
    const result = await saveTestResult(score);
    
    res.status(201).json({
      success: true,
      message: 'Test result saved successfully',
      data: result
    });
  } catch (error) {
    console.error('Error in saveResult:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
