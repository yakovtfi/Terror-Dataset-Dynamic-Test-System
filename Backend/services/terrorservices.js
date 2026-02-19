import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import csvParser from 'csv-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const loadCsvData = async (page = 1, limit = 50) => {
  try {
    const csvPath = path.join(__dirname, '..', 'data', 'terrorData.csv');
    
    const allResults = [];
    
    return new Promise((resolve, reject) => {
      fs.createReadStream(csvPath)
        .pipe(csvParser())
        .on('data', (data) => {
          allResults.push(data);
        })
        .on('end', () => {
       
          const startIndex = (page - 1) * limit;
          const endIndex = startIndex + limit;
          const paginatedResults = allResults.slice(startIndex, endIndex);
          
          resolve({
            data: paginatedResults,
            total: allResults.length,
            page: page,
            limit: limit,
            totalPages: Math.ceil(allResults.length / limit)
          });
        })
        .on('error', (error) => {
          reject(new Error(`Error loading CSV data: ${error.message}`));
        });
    });
  } catch (error) {
    throw new Error(`Error loading CSV data: ${error.message}`);
  }
};


export const saveTestResult = async (score) => {
  try {
    const resultsPath = path.join(__dirname, '..', 'data', 'testResults.json');
    
   
    const result = {
      date: new Date().toISOString(),
      score: score
    };
    
    let results = [];
    
   
    try {
      const existingData = await fs.promises.readFile(resultsPath, 'utf-8');
      results = JSON.parse(existingData);
    } catch (error) {
     
      results = [];
    }
    
    results.push(result);
    
  
    await fs.promises.writeFile(resultsPath, JSON.stringify(results, null, 2), 'utf-8');
    
    return result;
  } catch (error) {
    throw new Error(`Error saving test result: ${error.message}`);
  }
};
