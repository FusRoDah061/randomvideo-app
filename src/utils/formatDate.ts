/* eslint-disable import/no-duplicates */
import { format } from 'date-fns/esm';
import { ptBR } from 'date-fns/esm/locale';

const formatDate = (date: Date): string =>
  format(date, "dd 'de' MMM 'de' yyyy", { locale: ptBR });

export default formatDate;
