from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import numpy as np
from roi_forecaster import ROIPredictor

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Dhanmatrix Matrix Prophet API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictionRequest(BaseModel):
    capital: float
    months: int = 12
    historical_returns: List[float] = [0.12, 0.15, 0.18, 0.14, 0.16] # Default Growth Plan

class PredictionResponse(BaseModel):
    predicted_value: float
    annual_yield_percent: float
    confidence_low: float
    confidence_high: float
    message: str

@app.post("/predict", response_model=PredictionResponse)
async def predict_roi(request: PredictionRequest):
    try:
        prophet = ROIPredictor(request.historical_returns)
        result = prophet.predict_future_value(request.capital, request.months)
        
        return {
            "predicted_value": round(result['prediction'], 2),
            "annual_yield_percent": round(result['estimated_yield_pa'], 2),
            "confidence_low": round(result['confidence_interval'][0], 2),
            "confidence_high": round(result['confidence_interval'][1], 2),
            "message": "Protocol optimization successful. Wealth projection generated."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "Quantum Core Online", "version": "1.0.0"}
