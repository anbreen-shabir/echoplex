import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, AlertTriangle, MapPin, Clock, Activity } from 'lucide-react';

const CrowdMonitor: React.FC = () => {
  const [crowdData, setCrowdData] = useState({
    density: 0.72,
    velocity: 1.2,
    bottleneckRisk: 0.34,
    flowRate: 850,
  });

  const [predictions, setPredictions] = useState([
    { location: 'Main Stage Exit', risk: 'high', eta: '12 min', probability: 0.85 },
    { location: 'Food Court Bridge', risk: 'medium', eta: '18 min', probability: 0.64 },
    { location: 'West Gate Queue', risk: 'low', eta: '25 min', probability: 0.23 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCrowdData(prev => ({
        density: Math.max(0.1, Math.min(1, prev.density + (Math.random() - 0.5) * 0.05)),
        velocity: Math.max(0.1, Math.min(3, prev.velocity + (Math.random() - 0.5) * 0.1)),
        bottleneckRisk: Math.max(0, Math.min(1, prev.bottleneckRisk + (Math.random() - 0.5) * 0.05)),
        flowRate: Math.max(100, Math.min(1500, prev.flowRate + Math.floor((Math.random() - 0.5) * 50))),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-400 bg-red-900/20';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20';
      default: return 'text-green-400 bg-green-900/20';
    }
  };

  const heatmapData = [
    [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
    [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
    [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    [0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.8, 0.7],
    [0.5, 0.6, 0.7, 0.8, 0.9, 0.8, 0.7, 0.6],
    [0.6, 0.7, 0.8, 0.9, 0.8, 0.7, 0.6, 0.5],
  ];

  const getHeatColor = (value: number) => {
    if (value > 0.8) return 'bg-red-500';
    if (value > 0.6) return 'bg-yellow-500';
    if (value > 0.4) return 'bg-green-500';
    return 'bg-blue-500';
  };

  return (
    <div className="space-y-6">
      {/* Real-time Crowd Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-400">Crowd Density</p>
              <p className="text-2xl font-bold text-white">{Math.round(crowdData.density * 100)}%</p>
            </div>
            <Users className="h-8 w-8 text-blue-400" />
          </div>
          <div className="text-sm text-gray-400">
            {crowdData.density > 0.8 ? 'Critical' : crowdData.density > 0.6 ? 'High' : 'Normal'}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-400">Crowd Velocity</p>
              <p className="text-2xl font-bold text-white">{crowdData.velocity.toFixed(1)} m/s</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-400" />
          </div>
          <div className="text-sm text-gray-400">
            {crowdData.velocity > 2 ? 'Fast' : crowdData.velocity > 1 ? 'Moderate' : 'Slow'}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-400">Bottleneck Risk</p>
              <p className="text-2xl font-bold text-white">{Math.round(crowdData.bottleneckRisk * 100)}%</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-yellow-400" />
          </div>
          <div className="text-sm text-gray-400">
            {crowdData.bottleneckRisk > 0.7 ? 'High Risk' : crowdData.bottleneckRisk > 0.4 ? 'Medium Risk' : 'Low Risk'}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-400">Flow Rate</p>
              <p className="text-2xl font-bold text-white">{crowdData.flowRate}</p>
            </div>
            <Activity className="h-8 w-8 text-purple-400" />
          </div>
          <div className="text-sm text-gray-400">people/min</div>
        </div>
      </div>

      {/* Predictive Bottleneck Analysis */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Clock className="h-5 w-5 mr-2 text-blue-400" />
          Predictive Bottleneck Analysis
        </h3>
        <div className="space-y-4">
          {predictions.map((prediction, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-400" />
                  <span className="font-medium text-white">{prediction.location}</span>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(prediction.risk)}`}>
                  {prediction.risk.toUpperCase()}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">ETA: </span>
                  <span className="text-white">{prediction.eta}</span>
                </div>
                <div>
                  <span className="text-gray-400">Probability: </span>
                  <span className="text-white">{Math.round(prediction.probability * 100)}%</span>
                </div>
              </div>
              <div className="mt-3 w-full bg-gray-600 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    prediction.probability > 0.7 ? 'bg-red-500' : prediction.probability > 0.4 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${prediction.probability * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Crowd Density Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-blue-400" />
            Crowd Density Heatmap
          </h3>
          <div className="grid grid-cols-8 gap-1 mb-4">
            {heatmapData.map((row, i) => 
              row.map((value, j) => (
                <div 
                  key={`${i}-${j}`}
                  className={`h-8 w-8 rounded ${getHeatColor(value)} opacity-70`}
                  title={`Density: ${Math.round(value * 100)}%`}
                ></div>
              ))
            )}
          </div>
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>Low Density</span>
            <div className="flex space-x-1">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <div className="w-4 h-4 bg-red-500 rounded"></div>
            </div>
            <span>High Density</span>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-400" />
            Crowd Flow Patterns
          </h3>
          <div className="space-y-4">
            {[
              { zone: 'Main Stage', flow: 'Inbound Heavy', trend: 'up', value: 89 },
              { zone: 'Food Court', flow: 'Balanced', trend: 'stable', value: 45 },
              { zone: 'Exit Gates', flow: 'Outbound Light', trend: 'down', value: 23 },
              { zone: 'VIP Area', flow: 'Minimal', trend: 'stable', value: 12 },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
                <div>
                  <div className="text-white font-medium">{item.zone}</div>
                  <div className="text-sm text-gray-400">{item.flow}</div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">{item.value}%</div>
                  <div className={`text-xs ${
                    item.trend === 'up' ? 'text-red-400' : 
                    item.trend === 'down' ? 'text-green-400' : 'text-yellow-400'
                  }`}>
                    {item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '→'} {item.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrowdMonitor;