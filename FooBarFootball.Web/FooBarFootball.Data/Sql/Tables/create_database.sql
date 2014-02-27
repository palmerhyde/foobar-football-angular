/* Remove Relationships */
alter table [dbo].[Card] drop [FK_Card_CardRarity]
alter table [dbo].[Card] drop [FK_Card_CardType]
alter table [dbo].[Card] drop [FK_Card_CardStyle]
alter table [dbo].[Card] drop [FK_Card_CardPosition]
alter table [dbo].[Card] drop [FK_Card_CardClub]
alter table [dbo].[Card] drop [FK_Card_CardNation]
alter table [dbo].[Card] drop [FK_Card_CardLeague]
GO

/* Create tables */
IF OBJECT_ID('[dbo].[CardClub]', 'U') IS NOT NULL
  DROP TABLE dbo.CardClub
GO

CREATE TABLE [dbo].CardClub(
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
CONSTRAINT [PK_CardClub] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)
)
GO

IF OBJECT_ID('[dbo].[CardNation]', 'U') IS NOT NULL
  DROP TABLE dbo.CardNation
GO

CREATE TABLE [dbo].CardNation(
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
CONSTRAINT [PK_CardNation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)
)
GO

IF OBJECT_ID('[dbo].[CardLeague]', 'U') IS NOT NULL
  DROP TABLE dbo.CardLeague
GO

CREATE TABLE [dbo].CardLeague(
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
CONSTRAINT [PK_CardLeague] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)
)
GO

IF OBJECT_ID('[dbo].[CardStyle]', 'U') IS NOT NULL
  DROP TABLE dbo.CardStyle
GO

CREATE TABLE [dbo].CardStyle(
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
CONSTRAINT [PK_CardStyle] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)
)
GO

IF OBJECT_ID('[dbo].[CardPosition]', 'U') IS NOT NULL
  DROP TABLE dbo.CardPosition
GO

CREATE TABLE [dbo].CardPosition(
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
CONSTRAINT [PK_CardPosition] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)
)
GO

/* Create tables */
IF OBJECT_ID('[dbo].[CardRarity]', 'U') IS NOT NULL
  DROP TABLE dbo.CardRarity
GO

CREATE TABLE [dbo].CardRarity(
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
CONSTRAINT [PK_CardRarity] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)
)
GO

IF OBJECT_ID('[dbo].[CardType]', 'U') IS NOT NULL
  DROP TABLE dbo.CardType
GO

CREATE TABLE [dbo].[CardType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
CONSTRAINT [PK_CardType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)
)
GO

IF OBJECT_ID('[dbo].[Card]', 'U') IS NOT NULL
  DROP TABLE dbo.Card
GO

CREATE TABLE [dbo].[Card](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](500) NULL,
	[ShortName] [nvarchar](50) NULL,
	[PictureUrl] [nvarchar](50) NULL,
	[VideoUrl] [nvarchar](50) NULL,
	[Cost] [int] NOT NULL,
	[Attack] [int] NOT NULL,
	[Defense] [int] NOT NULL,
	[CardRarity] [int] NOT NULL,
	[CardType] [int] NOT NULL,
	[CardStyle] [int] NOT NULL,
	[CardPosition] [int] NULL,
	[CardClub] [int] NULL,
	[CardNation] [int] NULL,
	[CardLeague] [int] NULL,
CONSTRAINT [PK_Card] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)
)
GO

/* Add relationships */
ALTER TABLE [dbo].[Card]  WITH CHECK ADD  CONSTRAINT [FK_Card_CardClub] FOREIGN KEY([CardClub])
REFERENCES [dbo].[CardClub] ([Id])
GO

ALTER TABLE [dbo].[Card] CHECK CONSTRAINT [FK_Card_CardClub]
GO

ALTER TABLE [dbo].[Card]  WITH CHECK ADD  CONSTRAINT [FK_Card_CardNation] FOREIGN KEY([CardNation])
REFERENCES [dbo].[CardNation] ([Id])
GO

ALTER TABLE [dbo].[Card] CHECK CONSTRAINT [FK_Card_CardNation]
GO

ALTER TABLE [dbo].[Card]  WITH CHECK ADD  CONSTRAINT [FK_Card_CardLeague] FOREIGN KEY([CardLeague])
REFERENCES [dbo].[CardLeague] ([Id])
GO

ALTER TABLE [dbo].[Card] CHECK CONSTRAINT [FK_Card_CardLeague]
GO

ALTER TABLE [dbo].[Card]  WITH CHECK ADD  CONSTRAINT [FK_Card_CardPosition] FOREIGN KEY([CardPosition])
REFERENCES [dbo].[CardPosition] ([Id])
GO

ALTER TABLE [dbo].[Card] CHECK CONSTRAINT [FK_Card_CardPosition]
GO

ALTER TABLE [dbo].[Card]  WITH CHECK ADD  CONSTRAINT [FK_Card_CardRarity] FOREIGN KEY([CardRarity])
REFERENCES [dbo].[CardRarity] ([Id])
GO

ALTER TABLE [dbo].[Card] CHECK CONSTRAINT [FK_Card_CardRarity]
GO

ALTER TABLE [dbo].[Card]  WITH CHECK ADD  CONSTRAINT [FK_Card_CardType] FOREIGN KEY([CardType])
REFERENCES [dbo].[CardType] ([Id])
GO

ALTER TABLE [dbo].[Card] CHECK CONSTRAINT [FK_Card_CardType]
GO

ALTER TABLE [dbo].[Card]  WITH CHECK ADD  CONSTRAINT [FK_Card_CardStyle] FOREIGN KEY([CardStyle])
REFERENCES [dbo].[CardStyle] ([Id])
GO

ALTER TABLE [dbo].[Card] CHECK CONSTRAINT [FK_Card_CardStyle]
GO

/* Seed the database */
INSERT INTO [dbo].[CardPosition] ([Name]) VALUES ('Goalkeeper')
INSERT INTO [dbo].[CardPosition] ([Name]) VALUES ('Defender')
INSERT INTO [dbo].[CardPosition] ([Name]) VALUES ('Midfielder')
INSERT INTO [dbo].[CardPosition] ([Name]) VALUES ('Attacker')

INSERT INTO [dbo].[CardRarity] ([Name]) VALUES ('Common')
INSERT INTO [dbo].[CardRarity] ([Name]) VALUES ('Rare')
INSERT INTO [dbo].[CardRarity] ([Name]) VALUES ('Epic')
INSERT INTO [dbo].[CardRarity] ([Name]) VALUES ('Legendary')

INSERT INTO [dbo].[CardType] ([Name]) VALUES ('Player')
INSERT INTO [dbo].[CardType] ([Name]) VALUES ('Manager')
INSERT INTO [dbo].[CardType] ([Name]) VALUES ('Move')
INSERT INTO [dbo].[CardType] ([Name]) VALUES ('Stadium')
INSERT INTO [dbo].[CardType] ([Name]) VALUES ('User')

INSERT INTO [dbo].[CardStyle] ([Name]) VALUES ('Counter')
INSERT INTO [dbo].[CardStyle] ([Name]) VALUES ('Latin')
INSERT INTO [dbo].[CardStyle] ([Name]) VALUES ('Total')
INSERT INTO [dbo].[CardStyle] ([Name]) VALUES ('Physical')
INSERT INTO [dbo].[CardStyle] ([Name]) VALUES ('Direct')
INSERT INTO [dbo].[CardStyle] ([Name]) VALUES ('Neutral')

INSERT INTO [dbo].[CardClub] ([Name]) VALUES ('Chelsea')
INSERT INTO [dbo].[CardClub] ([Name]) VALUES ('Manchester United')

INSERT INTO [dbo].[CardNation] ([Name]) VALUES ('England')
INSERT INTO [dbo].[CardNation] ([Name]) VALUES ('Italy')

INSERT INTO [dbo].[CardLeague] ([Name]) VALUES ('Premiership')
INSERT INTO [dbo].[CardLeague] ([Name]) VALUES ('Serie A')

GO