from fastapi import FastAPI
import uvicorn
import httpx

app = FastAPI()


@app.get("/data")
def get_data():
    return {"message": "Hello"}
    
if __name__ == '__main__':
    uvicorn.run(app, host="127.0.0.1", port=8000)