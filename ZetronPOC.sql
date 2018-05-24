USE [Onvia]
GO
/****** Object:  Table [dbo].[ZetronMstIncidents]    Script Date: 9/25/2017 2:27:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[ZetronMstIncidents](
	[IncidentID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [varchar](255) NOT NULL,
	[Description] [varchar](255) NULL,
	[ReportedOn] [datetime] NOT NULL,
	[Location] [varchar](50) NOT NULL,
	[Status] [bit] NOT NULL,
 CONSTRAINT [PK_ZetronMstIncidents] PRIMARY KEY CLUSTERED 
(
	[IncidentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[ZetronTrnFrameTags]    Script Date: 9/25/2017 2:27:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[ZetronTrnFrameTags](
	[FrameID] [int] IDENTITY(1,1) NOT NULL,
	[MediaID] [int] NOT NULL,
	[FrameTime] [datetime] NOT NULL,
	[Tag] [varchar](50) NOT NULL,
	[ConfidenceLevel] [int] NOT NULL,
 CONSTRAINT [PK_ZetronTrnFrameTags] PRIMARY KEY CLUSTERED 
(
	[FrameID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[ZetronTrnMediaDetails]    Script Date: 9/25/2017 2:27:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[ZetronTrnMediaDetails](
	[MediaID] [int] IDENTITY(1,1) NOT NULL,
	[IncidentID] [int] NOT NULL,
	[MediaURL] [varchar](max) NOT NULL,
	[MediaType] [int] NOT NULL,
	[PostedIOn] [datetime] NOT NULL,
	[PostedBy] [varchar](50) NOT NULL,
	[Status] [bit] NOT NULL,
 CONSTRAINT [PK_ZetronTrnMediaDetails] PRIMARY KEY CLUSTERED 
(
	[MediaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
ALTER TABLE [dbo].[ZetronTrnFrameTags]  WITH CHECK ADD  CONSTRAINT [FK_ZetronTrnFrameTags_ZetronTrnMediaDetails] FOREIGN KEY([MediaID])
REFERENCES [dbo].[ZetronTrnMediaDetails] ([MediaID])
GO
ALTER TABLE [dbo].[ZetronTrnFrameTags] CHECK CONSTRAINT [FK_ZetronTrnFrameTags_ZetronTrnMediaDetails]
GO
ALTER TABLE [dbo].[ZetronTrnMediaDetails]  WITH CHECK ADD  CONSTRAINT [FK_ZetronTrnMediaDetails_ZetronMstIncidents] FOREIGN KEY([IncidentID])
REFERENCES [dbo].[ZetronMstIncidents] ([IncidentID])
GO
ALTER TABLE [dbo].[ZetronTrnMediaDetails] CHECK CONSTRAINT [FK_ZetronTrnMediaDetails_ZetronMstIncidents]
GO
