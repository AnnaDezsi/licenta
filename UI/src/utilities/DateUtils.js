export const formatDateTime = (dateInput) => {
    const date = new Date(dateInput);
  
    if (isNaN(date)) {
      return '';
    }
  
    return date.toLocaleString('ro-RO', {
      weekday: 'short', 
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };
  