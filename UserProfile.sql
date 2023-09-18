drop database IF EXISTS UserProfile;

create database UserProfile;

Use UserProfile;

create table DBNAME (
UUser varchar(25) PRIMARY KEY,
UPassword varchar(20) NOT NULL,
UEMAIL varchar(100) UNIQUE,
UAddress varchar(200),
UName varchar(100)
);

create table BOOKS (
BISBN integer PRIMARY KEY,
BName varchar(100) NOT NULL,
BDesc varchar(100) NOT NULL,
BPrice float(10) NOT NULL,
BGenre varchar(100) NOT NULL,
BPublisher varchar(100) NOT NULL,
BYear integer NOT NULL,
BCopiesSold  integer NOT NULL,
BRatingSum  integer NOT NULL,
BRatingCount integer NOT NULL
);

create table PAYMENT(
PCard integer PRIMARY KEY,
PUser varchar(25) NOT NULL,
PName varchar(100) NOT NULL,
PBilling varchar(200) NOT NULL,
foreign key (PUser) references DBNAME (UUser) ON DELETE CASCADE
);


create table ADDWISHLIST(
AName VARCHAR(200) PRIMARY KEY,
AUser varchar(25) NOT NULL,
foreign key (AUser) references DBNAME (UUser) ON DELETE CASCADE
);

create table WISHLISTBOOK(
WName VARCHAR(200) NOT NULL,
WBook integer NOT NULL,
foreign key (WBook) references BOOKS (BISBN) ON DELETE CASCADE,
foreign key (WName) references ADDWISHLIST (AName) ON DELETE CASCADE
);

create table SHOPPING(
SId integer UNIQUE NOT NULL AUTO_INCREMENT,
SUser varchar(25) NOT NULL,
PRIMARY KEY (SId),
foreign key (SUser) references DBNAME (UUser) ON DELETE CASCADE
);

create table ADDSHOPPING(
AId integer NOT NULL,
ABook integer NOT NULL,
foreign key (ABook) references BOOKS (BISBN) ON DELETE CASCADE,
foreign key (AId) references SHOPPING (SId) ON DELETE CASCADE
);

create table COMMENTS (
CommentID integer PRIMARY KEY,
CommentContent varchar(200) NOT NULL,
CommentUsername varchar(200) NOT NULL,
CommentDate TIMESTAMP DEFAULT NOW() NOT NULL,
ISBN integer NOT NULL UNIQUE,
foreign key (ISBN) references BOOKS (BISBN) ON DELETE CASCADE
);

