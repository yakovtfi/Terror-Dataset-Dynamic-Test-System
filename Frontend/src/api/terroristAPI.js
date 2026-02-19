export const API_BASE_URL = 'http://localhost:3000/api/terror';


export async function getAllterrorData(){
  const response = await fetch(`${API_BASE_URL}/data`,{
        method:'GET',
        headers:{
             'Content-Type': 'application/json',
        },
        
    });
    const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
    

}

export async function loadAllData() {
  try {
    const first50 = await getAllterrorData();
    return first50.data;
  } catch (error) {
    throw new Error(`Error loading all data: ${error.message}`);
  }
}

export async function saveTerrorResult(score) {
     const response = await fetch(`${API_BASE_URL}/result`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ score }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
}
