// hooks/useProcesados.ts
import { useState, useEffect } from 'react';
import { procesadosService } from '../services';
import { Procesado } from '../types';

export function useProcesados() {
  const [procesados, setProcesados] = useState<Procesado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProcesados = async () => {
      setLoading(true);
      const response = await procesadosService.getProcesados();
      
      if (response.success) {
        setProcesados(response.data);
        setError(null);
      } else {
        setError(response.error);
        setProcesados([]);
      }
      
      setLoading(false);
    };

    loadProcesados();
  }, []);

  return { procesados, loading, error };
}

export function useProcesadoSearch(query: string) {
  const [results, setResults] = useState<Procesado[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const search = async () => {
      setLoading(true);
      const response = await procesadosService.searchProcesados(query);
      
      if (response.success) {
        setResults(response.data);
        setError(null);
      } else {
        setError(response.error);
        setResults([]);
      }
      
      setLoading(false);
    };

    // Debounce: espera 300ms antes de buscar
    const timer = setTimeout(search, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return { results, loading, error };
}
