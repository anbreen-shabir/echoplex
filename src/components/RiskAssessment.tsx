import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, TrendingUp, Cloud, Users, Zap, Clock } from 'lucide-react';

const RiskAssessment: React.FC = () => {
  const [riskScore, setRiskScore] = useState(0.34);
  const [weatherScore, setWeatherScore] = useState(0.15);
  const [crowdScore, setCrowdScore] = useState(0.68);
  const [securityScore, setSecurityScore] = useState(0.12);

  useEffect(() => {
    const interval = setInterval(() => {
      setRiskScore(Math.max(0, Math.min(1, 0.34 + (Math.random() - 0.5) * 0.1)));
      setWeatherScore(Math.max(0, Math.min(1, 0.15 + (Math.random() - 0.5) * 0.05)));
      setCrowdScore(Math.max(0, Math.min(1, 0.68 + (Math.random() - 0.5) * 0.1)));
      setSecurityScore(Math.max(0, Math.min(1, 0.12 + (Math.random() - 0.5) * 0.05)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const riskFactors = [
    { 
      name: 'Weather Conditions', 
      score: weatherScore, 
      icon: Cloud, 
      details: 'Clear skies, light wind',
      trend: 'stable'
    },
    { 
      name: 'Crowd Density', 
      score: crowdScore, 
      icon: Users, 
      details: 'High density at main stage',
      trend: 'increasing'
    },
    { 
      name: 'Security Incidents', 
      score: securityScore, 
      icon: Shield, 
      details: 'Minor incidents reported',
      trend: 'decreasing'
    },
    { 
      name: 'Infrastructure', 
      score: 0.08, 
      icon: Zap, 
      details: 'All systems operational',
      trend: 'stable'
    },
  ];

  const predictions = [
    {
      time: '15:30',
      risk: 'Medium',
      event: 'Main act performance starts',
      probability: 0.72,
      mitigation: 'Deploy additional crowd control staff'
    },
    {
      time: '16:45',
      risk: 'High',
      event: 'Peak crowd density expected',
      probability: 0.89,
      mitigation: 'Activate crowd diversion protocols'
    },
    {
      time: '18:00',
      risk: 'Low',
      event: 'Event conclusion, mass exodus',
      probability: 0.45,
      mitigation: 'Open all exit gates'
    },
  ];

  const getScoreColor = (score: number) => {
    if (score > 0.7) return 'bg-red-500';
    if (score > 0.4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getScoreTextColor = (score: number) => {
    if (score > 0.7) return 'text-red-400';
    if (score > 0.4) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return '↗';
      case 'decreasing': return '↘';
      default: return '→';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Risk Score */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-6 flex items-center">
          <Shield className="h-5 w-5 mr-2 text-blue-400" />
          Overall Risk Assessment
        </h3>
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-gray-700"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - riskScore)}`}
                className={riskScore > 0.7 ? 'text-red-500' : riskScore > 0.4 ? 'text-yellow-500' : 'text-green-500'}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-2xl font-bold ${getScoreTextColor(riskScore)}`}>
                  {Math.round(riskScore * 100)}
                </div>
                <div className="text-sm text-gray-400">Risk Score</div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <div className={`text-lg font-semibold mb-2 ${getScoreTextColor(riskScore)}`}>
            {riskScore > 0.7 ? 'High Risk' : riskScore > 0.4 ? 'Medium Risk' : 'Low Risk'}
          </div>
          <div className="text-sm text-gray-400">
            Based on real-time analysis of multiple risk factors
          </div>
        </div>
      </div>

      {/* Risk Factors Breakdown */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-blue-400" />
          Risk Factors Analysis
        </h3>
        <div className="space-y-4">
          {riskFactors.map((factor, index) => {
            const Icon = factor.icon;
            return (
              <div key={index} className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5 text-blue-400" />
                    <span className="font-medium text-white">{factor.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">{getTrendIcon(factor.trend)}</span>
                    <span className={`text-sm font-medium ${getScoreTextColor(factor.score)}`}>
                      {Math.round(factor.score * 100)}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getScoreColor(factor.score)}`}
                    style={{ width: `${factor.score * 100}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-400">{factor.details}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Predictive Risk Timeline */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Clock className="h-5 w-5 mr-2 text-blue-400" />
          Predictive Risk Timeline
        </h3>
        <div className="space-y-4">
          {predictions.map((prediction, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="text-blue-400 font-mono text-sm">{prediction.time}</div>
                  <span className="text-white font-medium">{prediction.event}</span>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  prediction.risk === 'High' ? 'bg-red-900/20 text-red-400' :
                  prediction.risk === 'Medium' ? 'bg-yellow-900/20 text-yellow-400' :
                  'bg-green-900/20 text-green-400'
                }`}>
                  {prediction.risk}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Probability: </span>
                  <span className="text-white">{Math.round(prediction.probability * 100)}%</span>
                </div>
                <div>
                  <span className="text-gray-400">Mitigation: </span>
                  <span className="text-white">{prediction.mitigation}</span>
                </div>
              </div>
              <div className="mt-3 w-full bg-gray-600 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    prediction.probability > 0.7 ? 'bg-red-500' : 
                    prediction.probability > 0.4 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${prediction.probability * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-blue-400" />
          AI-Generated Recommendations
        </h3>
        <div className="space-y-3">
          {[
            {
              priority: 'High',
              action: 'Deploy additional crowd control barriers near main stage',
              reason: 'High crowd density detected with potential for bottleneck formation'
            },
            {
              priority: 'Medium',
              action: 'Increase medical staff presence in food court area',
              reason: 'Heat index rising, potential for heat-related incidents'
            },
            {
              priority: 'Low',
              action: 'Activate overflow parking areas',
              reason: 'Parking capacity at 85%, may reach limit within 2 hours'
            },
          ].map((rec, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  rec.priority === 'High' ? 'bg-red-900/20 text-red-400' :
                  rec.priority === 'Medium' ? 'bg-yellow-900/20 text-yellow-400' :
                  'bg-blue-900/20 text-blue-400'
                }`}>
                  {rec.priority} Priority
                </span>
                <button className="text-blue-400 hover:text-blue-300 text-sm">
                  Implement
                </button>
              </div>
              <div className="text-white font-medium mb-1">{rec.action}</div>
              <div className="text-sm text-gray-400">{rec.reason}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiskAssessment;