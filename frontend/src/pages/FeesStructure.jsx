import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AcademicsPages from './AcademicsPages';

/**
 * FeesStructure Page Wrapper Component
 * Automatically forwards/renders AcademicsPages with tab='fee-structure'
 */
const FeesStructure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Optionally update query param if loaded directly
    const params = new URLSearchParams(window.location.search);
    if (params.get('tab') !== 'fee-structure') {
      navigate('/Academics?tab=fee-structure', { replace: true });
    }
  }, [navigate]);

  return <AcademicsPages />;
};

export default FeesStructure;