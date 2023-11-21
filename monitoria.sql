-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 21/11/2023 às 10:53
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
(1, 'Engenharia de Software', 'Profª. Daniela Gibertoni'),
(2, 'Engenharia de Software', 'Prof. Carlos Filho');

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
(5, '123', '01:23:12', '00:01:23', 50, 1);

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
(50, 'ANDRESA MEDALHA SINCHETTI', 'andresa.sinchetti@fatec.sp.gov.br', '0220912021006', 'MD');

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `horariosmonitoria`
--
ALTER TABLE `horariosmonitoria`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `inscricoes`
--
ALTER TABLE `inscricoes`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `monitores`
--
ALTER TABLE `monitores`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

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
