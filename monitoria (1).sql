-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 23/11/2023 às 03:36
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `monitoria`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `disciplinas`
--

CREATE TABLE `disciplinas` (
  `ID` int(11) NOT NULL,
  `Nome` varchar(255) NOT NULL,
  `Professor` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `disciplinas`
--

INSERT INTO `disciplinas` (`ID`, `Nome`, `Professor`) VALUES
(1, 'ALGORITMOS E LOGICA DE PROGRAMAÇÃO + ESTRUTURA DE DADOS+ LINGUAGEM DE PROGRAMACAO + INTRODUÇÃO À PROGRAMAÇÃO', 'Prof. Eder'),
(2, 'ALGORITMOS E LÓGICA DE PROGRAMAÇÃO + INTRODUÇÃO À PROGRAMAÇÃO', 'Prof. Eder'),
(3, 'CÁLCULO + CÁLCULO I + CÁLCULO II +ESTATÍSTICA', 'Profº'),
(4, 'ALGORITMOS E LÓGICA DE PROGRAMAÇÃO + LINGUAGEM DE PROGRAMAÇÃO + INTRODUÇÃO À PROGRAMAÇÃO', 'Profº'),
(5, 'PESQUISA OPERACIONAL + PROGRAMAÇÃO LINEAR ', 'Prof°'),
(6, 'FÍSICA', 'Prof°');

-- --------------------------------------------------------

--
-- Estrutura para tabela `horariosmonitoria`
--

CREATE TABLE `horariosmonitoria` (
  `ID` int(11) NOT NULL,
  `DiaSemana` varchar(20) NOT NULL,
  `HorarioInicio` time NOT NULL,
  `HorarioTermino` time NOT NULL,
  `MonitorID` int(11) DEFAULT NULL,
  `DisciplinaID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `horariosmonitoria`
--

INSERT INTO `horariosmonitoria` (`ID`, `DiaSemana`, `HorarioInicio`, `HorarioTermino`, `MonitorID`, `DisciplinaID`) VALUES
(8, 'Segunda-feira', '07:40:00', '11:10:00', 1, 5),
(9, 'Quarta-feira', '11:20:00', '12:40:00', 1, 5),
(10, 'Quinta-feira', '11:20:00', '12:40:00', 1, 5),
(11, 'Sexta-feira', '07:40:00', '09:30:00', 1, 5),
(12, 'Terça-feira', '07:30:00', '09:30:00', 2, 3),
(13, 'Quarta-feira', '11:15:00', '12:45:00', 2, 3),
(14, 'Quinta-feira', '11:15:00', '12:45:00', 2, 3),
(15, 'Sexta-feira', '00:12:40', '15:40:00', 2, 3),
(16, 'Quarta-Feira', '20:30:00', '22:30:00', 3, 4),
(17, 'Sexta-feira', '15:00:00', '19:00:00', 3, 4),
(18, 'Segunda-feira', '16:00:00', '19:00:00', 4, 1),
(19, 'Quarta-feira', '16:00:00', '19:00:00', 4, 1),
(20, 'Sexta-feira', '15:00:00', '17:00:00', 4, 1),
(21, 'Segunda-feira', '17:00:00', '19:00:00', 5, 2),
(22, 'Terça-feira', '17:30:00', '19:00:00', 5, 2),
(23, 'Quarta-feira', '17:30:00', '19:00:00', 5, 2),
(24, 'Quinta-Feira', '17:30:00', '19:00:00', 5, 2),
(25, 'Sexta-feira', '17:30:00', '19:00:00', 5, 2),
(26, 'Segunda-feira', '18:00:00', '19:00:00', 6, 6),
(27, 'Terça-Feira', '18:00:00', '19:00:00', 6, 6),
(28, 'Quarta-Feira', '18:00:00', '19:00:00', 6, 6),
(29, 'Quinta-feira', '18:00:00', '19:00:00', 6, 6),
(30, 'Sexta-feira', '18:00:00', '19:00:00', 6, 6);

-- --------------------------------------------------------

--
-- Estrutura para tabela `inscricoes`
--

CREATE TABLE `inscricoes` (
  `ID` int(11) NOT NULL,
  `ProcessoSeletivoID` int(11) DEFAULT NULL,
  `MonitorID` int(11) DEFAULT NULL,
  `DataInscricao` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `monitores`
--

CREATE TABLE `monitores` (
  `ID` int(11) NOT NULL,
  `Nome` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Ra` varchar(20) NOT NULL,
  `Tipo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `monitores`
--

INSERT INTO `monitores` (`ID`, `Nome`, `Email`, `Ra`, `Tipo`) VALUES
(1, 'ANDRESA MEDALHA SINCHETTI', 'andresa.sinchetti@fatec.sp.gov.br', '0220912021006', 'MD'),
(2, 'CELIA HIDALGO PEREIRA', 'celia.pereira@fatec.sp.gov.br', '0220911921005', 'MD'),
(3, 'GABRIEL OLIVEIRA SILVA', 'gabriel.silva523@fatec.sp.gov.br', '0220482113002', 'MD'),
(4, 'HIGOR FRANCISCO DE ABREU', 'higor.abreu@fatec.sp.gov.br', '0220481922020', 'MD'),
(5, 'JOSÉ VITOR MICHELIN', 'jose.michelin@fatec.sp.gov.br', '0220482123002', 'MD'),
(6, 'RAFAEL TREVIZANELI DE MOURA', 'rafael.moura25@fatec.sp.gov.br', '0220912121013', 'MD');

-- --------------------------------------------------------

--
-- Estrutura para tabela `processosseletivos`
--

CREATE TABLE `processosseletivos` (
  `ID` int(11) NOT NULL,
  `Tipo` varchar(50) NOT NULL,
  `Status` varchar(20) NOT NULL,
  `DataAbertura` date NOT NULL,
  `DataConclusao` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `disciplinas`
--
ALTER TABLE `disciplinas`
  ADD PRIMARY KEY (`ID`);

--
-- Índices de tabela `horariosmonitoria`
--
ALTER TABLE `horariosmonitoria`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `MonitorID` (`MonitorID`),
  ADD KEY `DisciplinaID` (`DisciplinaID`);

--
-- Índices de tabela `inscricoes`
--
ALTER TABLE `inscricoes`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ProcessoSeletivoID` (`ProcessoSeletivoID`),
  ADD KEY `MonitorID` (`MonitorID`);

--
-- Índices de tabela `monitores`
--
ALTER TABLE `monitores`
  ADD PRIMARY KEY (`ID`);

--
-- Índices de tabela `processosseletivos`
--
ALTER TABLE `processosseletivos`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `disciplinas`
--
ALTER TABLE `disciplinas`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `horariosmonitoria`
--
ALTER TABLE `horariosmonitoria`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de tabela `inscricoes`
--
ALTER TABLE `inscricoes`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `monitores`
--
ALTER TABLE `monitores`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT de tabela `processosseletivos`
--
ALTER TABLE `processosseletivos`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `horariosmonitoria`
--
ALTER TABLE `horariosmonitoria`
  ADD CONSTRAINT `horariosmonitoria_ibfk_1` FOREIGN KEY (`MonitorID`) REFERENCES `monitores` (`ID`),
  ADD CONSTRAINT `horariosmonitoria_ibfk_2` FOREIGN KEY (`DisciplinaID`) REFERENCES `disciplinas` (`ID`);

--
-- Restrições para tabelas `inscricoes`
--
ALTER TABLE `inscricoes`
  ADD CONSTRAINT `inscricoes_ibfk_1` FOREIGN KEY (`ProcessoSeletivoID`) REFERENCES `processosseletivos` (`ID`),
  ADD CONSTRAINT `inscricoes_ibfk_2` FOREIGN KEY (`MonitorID`) REFERENCES `monitores` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
