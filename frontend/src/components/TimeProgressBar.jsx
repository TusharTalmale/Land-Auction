import { useEffect, useState } from 'react';

export const TimeProgressBar = ({ startTime, endTime }) => {
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [auctionStatus, setAuctionStatus] = useState('');

  useEffect(() => {
    const calculateProgress = () => {
      const now = Date.now();
      const start = Number(startTime);
      const end = Number(endTime);
      
      // Validate times
      if (isNaN(start) || isNaN(end)) {
        setAuctionStatus('Invalid time data');
        return;
      }

      // Determine auction status
      if (now < start) {
        setAuctionStatus('Not Started');
        setProgress(0);
        setTimeRemaining(`Starts in ${formatTimeRemaining(start - now)}`);
        return;
      }

      if (now > end) {
        setAuctionStatus('Ended');
        setProgress(100);
        setTimeRemaining('Auction completed');
        return;
      }

      // Calculate progress for ongoing auction
      setAuctionStatus('Live');
      const totalDuration = end - start;
      const elapsed = now - start;
      const percentage = (elapsed / totalDuration) * 100;
      setProgress(Math.min(Math.max(percentage, 0), 100));
      setTimeRemaining(`${formatTimeRemaining(end - now)} remaining`);
    };

    // Helper function to format time
    const formatTimeRemaining = (ms) => {
      const days = Math.floor(ms / (1000 * 60 * 60 * 24));
      const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
      
      if (days > 0) return `${days}d ${hours}h`;
      if (hours > 0) return `${hours}h ${minutes}m`;
      return `${minutes}m`;
    };

    calculateProgress();
    const interval = setInterval(calculateProgress, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [startTime, endTime]);

  // Status-based styling
  const getStatusColor = () => {
    switch(auctionStatus) {
      case 'Not Started': return 'bg-gray-300';
      case 'Live': return 'bg-gradient-to-r from-blue-500 to-purple-600';
      case 'Ended': return 'bg-green-500';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="w-full space-y-2 mb-4">
      <div className="flex justify-between items-center text-sm">
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          auctionStatus === 'Live' ? 'bg-green-100 text-green-800' :
          auctionStatus === 'Ended' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {auctionStatus}
        </span>
        <span className="text-gray-600">{timeRemaining}</span>
      </div>
      
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ease-out ${getStatusColor()}`}
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
      
      <div className="flex justify-between text-xs text-gray-500">
        <span>Start: {new Date(Number(startTime)).toLocaleString()}</span>
        <span>End: {new Date(Number(endTime)).toLocaleString()}</span>
      </div>
    </div>
  );
};
