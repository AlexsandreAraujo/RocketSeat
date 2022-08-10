# AGENDAMENTO DE SERVIÇOS

**Regras Funcionais(RF)**

- O usuário deve poder listar todos os prestadores de serviços cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar os horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**Regras não Funcionais(RNF)**

- A listagem de prestadores devem ser armazenados em cache;

**Regras de Negocio (RN)**

- Cada agendamento deve durar 1 hora exatamente;
- Os agendamentos devem estar disponíveis entre 8h as 18h (primeiro às 8h, último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;
