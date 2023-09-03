<p style="text-align: center;">

[![Generic badge](https://img.shields.io/badge/version-1.0.0-green.svg)](https://shields.io/)
[![Generic badge](https://img.shields.io/badge/Laravel-10.21-critical.svg)](https://shields.io/)
[![Generic badge](https://img.shields.io/badge/PHP-8.2-blueviolet.svg)](https://shields.io/)
[![Generic badge](https://img.shields.io/badge/React-18.2-9cf.svg)](https://shields.io/)
[![Generic badge](https://img.shields.io/badge/Tailwind-3.3.3-informational.svg)](https://shields.io/)

</p>

# About Servyrun

Servyrun is a self-hosted web application built with React + Tailwind CSS for the frontend and a backend of PHP Laravel.
Servyrun allows you to run simple SSH & SFTP commands, do pings between your servers, download, upload & edit files, view database tables and column structures and run MySQLdump.

Servyrun should not be used as your main connection to your servers but rather an easy method to monitor, be informed and do small tasks all through the web panel rather than an SSH client.


Servyrun was developed to be a multi-user platform, stores passwords encrypted and has an extensive API.

The full features of Servyrun as of September 2023:

- Store Server information
- Store SSH keys
- Run SSH commands
- View server usage
- Store commands
- Store command outputs
- Print command outputs to PDF
- Check if IP address is up
- Ping IP from any added server
- Store IP addresses and get information (GEO, ASN etc).
- Store SFTP connections.
- Download files through SFTP.
- Upload files through SFTP.
- View files through SFTP.
- Move files between SFTP connections.
- Edit (smaller) files.
- Store/View information about databases, tables and columns.

## TODO

- Chart for pings between 2 servers

## External services used

* https://ipwhois.io/documentation for IP address GEO data

## Screenshots

![Servers index page](https://cdn.write.corbpie.com/wp-content/uploads/2023/05/servers-index-dark.png)

![Connection run command page](https://cdn.write.corbpie.com/wp-content/uploads/2023/05/connection-show-dark.png)

![Server page](https://cdn.write.corbpie.com/wp-content/uploads/2023/05/server-show-dark.png)

![Database table structure page](https://cdn.write.corbpie.com/wp-content/uploads/2023/05/database-table-show-dark.png)

# API documentation Contents

1. [ Information ](#apiinfo)
2. [ Servers ](#servers)
3. [ Connections ](#connections)
4. [ Keys ](#keys)
5. [ SFTP ](#stp)
6. [ Database Connections ](#databaseconnections)
7. [ Databases ](#databases)
8. [ Database tables ](#tables)
9. [ Database table Columns ](#columns)
10. [ IP addresses ](#ips)
11. [ Pings ](#pings)
12. [ Ping groups ](#pinggroups)
13. [ Commands ](#commands)
14. [ Command groups ](#commandgroups)
15. [ Logs ](#logs)
16. [ MySQLdump ](#mysqldump)
17. [ Downloaded ](#downloaded)

<a name="apiinfo"></a>

## Information

Get your API token from your profile page: ```/profile```

Your API token must be included in each request header as ```'Authorization: Bearer YOUR_API_TOKEN'```

```'Accept: application/json'``` and ```'Content-Type: application/json'``` are required for requests.

**Pagination in use** for calls that could return a large amount of results e.g 'index' calls

You can specify a page by using `page=X`
You can change the amount returned in results with `per_page=50`

```json
{
    "current_page": 2,
    "data": [
        //Good stuff in here
    ],
    "first_page_url": "https:\/\/url.com\/api\/servers?page=1",
    "from": null,
    "last_page": 1,
    "last_page_url": "http:\/\/url.com\/api\/servers?page=1",
    "links": [
        {
            "url": "http:\/\/url.com\/api\/servers?page=1",
            "label": "&laquo; Previous",
            "active": false
        },
        {
            "url": "http:\/\/url.com\/api\/servers?page=1",
            "label": "1",
            "active": false
        },
        {
            "url": null,
            "label": "Next &raquo;",
            "active": false
        }
    ],
    "next_page_url": null,
    "path": "https:\/\/url.com\/api\/servers",
    "per_page": 20,
    "prev_page_url": "https:\/\/url.com\/api\/servers?page=1",
    "to": null,
    "total": 1
}
```

<a name="servers"></a>

## Servers

### Server API calls

#### Get all servers

`GET` `/servers/`

#### Get a server with IPs, location, type and connection

`GET` `/servers/{Server}`

#### Get a server with its pings

`GET` `/servers/{Server}/pings`

#### Get a server with its command outputs

`GET` `/servers/{Server}/commands`

#### Get servers SSH IP

`GET` `/servers/{Server}/ip`

#### Get Servers edit/create parameters

`GET` `/servers/help`

#### Update a server

`PATCH` `/servers/{Server}`

An example body to update a server:

```json
{
    "title": "Lets change the title",
    "ping_port": 123,
    "hostname": "hostname.com"
}
```

#### Create a server

`POST` `/servers/`

**'hostname' is the only required parameter**

An example body to create a server:

```json
{
    "title": "SYD-1C-2GB-30GB",
    "hostname": "syd.server.com",
    "type_id": 1,
    "cpu_cores": 1,
    "cpu_freq": 3.1,
    "ram_gb": 2,
    "disk_gb": 30,
    "ping_port": 80
}
```

#### Destroy a server

`DELETE` `/servers/{Server}`


---

<a name="connections"></a>

## Connections

comment

### Connection API calls

#### Get all connections

`GET` `/connections/`

#### Get a connections with server and key

`GET` `/connections/{connection}`

#### Get connection edit/create parameters

`GET` `/connections/help`

#### Update a connection

`PATCH` `/connections/{connection}`

#### Create a connection

`POST` `/connections/`

An example body to create a password connection for a server:

```json
{
    "server_id": "ABCD1234",
    "username": "root",
    "password": "thePasswordGoesHere"
}
```

An example body to create a key password connection for a server:

```json
{
    "server_id": "ABCD1234",
    "key_id": "qwerty12",
    "username": "root",
    "password": "thePasswordGoesHere"
}
```

#### Destroy a connection

`DELETE` `/connections/{connection}`

#### Run a command with a connection

`POST` `/connections/{connection}/run`

An example body to run a command:

```json
{
    "command": "df -h"
}
```

An example body to run a command and get email notification:

```json
{
    "command": "df -h",
    "email": true
}
```

---

<a name="keys"></a>

## Keys

comment

### Keys API calls

#### Get all keys

`GET` `/keys/`

#### Get a key with its connection

`GET` `/keys/{key}`

#### Upload and create  a key

`POST` `/keys`

An example for uploading a key file:

```shell
curl 
--location 'https://domain.com/api/keys' \
--header 'Accept: application/json' \
--header 'Authorization: Bearer JN7tXwInJVwix3a8FlGLDdILHlSqRcC2oSIdDmPsdFWqD6oLcGgFz74FISSaWENA' \
--form 'file=@"/C:/thekey.private.ppk"'
```

#### Update a keys password

`PATCH` `/keys/{key}`

You can only pass the parameter password! Leave as empty quotes for no password.

```json
{
    "password": "thekeyspasswordgoeshere"
}
```

#### Destroy a key

`DELETE` `/keys/{key}`

---

<a name="sftp"></a>

## SFTP

comment

### SFTP connections API calls

#### Get all SFTP connections

`GET` `/sftp/`

#### Get a SFTP connection with its server and key

`GET` `/sftp/{sftpConnection}`

#### Get SFTP connection edit/create parameters

`GET` `/sftp/help`

#### Update a SFTP connection

`PATCH` `/sftp/{sftpConnection}`

```json
{
    "username": "jim",
    "password": "thisgetsencryptedanyway",
    "port": 44
}
```

#### Create a SFTP connection

`POST` `/sftp/`

SFTP must have a server to be attached to!

```json
{
    "server_id": "HwCV0NMW",
    "username": "user",
    "password": "thisgetsencryptedanyway",
    "port": 22
}
```

SFTP with a key connection

```json
{
    "server_id": "HwCV0NMW",
    "key_id": "abcd1234",
    "username": "user",
    "port": 22
}
```

#### Destroy a SFTP connection

`DELETE` `/sftp/{sftpConnection}`

---

<a name="databaseconnections"></a>

## Database connections

comment

### Database connections API calls

#### Get all Database connections

`GET` `/db/connection/`

#### Get a database connections with server and key

`GET` `/db/connection/{databaseConnection}`

#### Get database connection edit/create parameters

`GET` `/db/connection/help`

#### Update a database connection

`PATCH` `/db/connection/{databaseConnection}`

```json
{
    "title": "changed title"
}
```

#### Create a database connection

`POST` `/db/connections/`

```json
{
    "host": "127.0.0.1",
    "title": "a title",
    "username": "user",
    "password": "getsencrypted",
    "port": 3306
}
```

#### Destroy a database connection

`DELETE` `/db/connections/{databaseConnection}`

#### Refresh a database connection to re-fetch database, tables and columns

`GET` `/db/connection/{databaseConnection}/refresh`

#### Fetches and returns databases for this connection

`GET` `/db/connection/{databaseConnection}/databases`

---

<a name="databases"></a>

## Databases

### ~ Note these database calls are read only and do not execute queries i.e deleting a table just removes it from this local database.

### Database API calls

#### Get all Databases

`GET` `/db/`

#### Get a individual database

`GET` `/db/{database}`

#### Get a database with tables

`GET` `/db/{database}/tables`

#### Destroy a database

`DELETE` `/db/{database}`

---

<a name="tables"></a>

## Database tables

#### Get a database table

`GET` `/db/table/{databaseTable}`

#### Get a database table columns

`GET` `/db/table/{databaseTable}/columns`

#### Destroy a table

`DELETE` `/db/table/{databaseTable}`

#### Run a query on a table

`POST` `/db/table/{databaseTable}/query`

The validation will only allow the columns to be those found in the table.

An example body to run a query, required fields only:

```json
{
    "column1": "id",
    "condition1": ">",
    "value1": "500"
}
```

An example body to run a query, required and optional fields:

```json
{
    "column1": "id",
    "condition1": ">",
    "value1": "500",
    "column2": "id",
    "condition2": "<",
    "value2": "1000",
    "order": "score",
    "order_direction": "desc",
    "limit": 20
}
```

---


<a name="columns"></a>

## Database table columns

#### Get a column

`GET` `/db/column/{databaseTableColumn}`

#### Destroy a column

`DELETE` `/db/column/{databaseTableColumn}`

---

<a name="ips"></a>

## IP addresses

comment

### Ip address API calls

#### Get all Ip addresses

`GET` `/ips/`

#### Get an Ip address with its server

`GET` `/ips/{ipAddress}`

#### Get Ip address edit/create parameters

`GET` `/ips/help`

#### Update an Ip address

`PATCH` `/ips/{ipAddress}`

#### Create an Ip address

`POST` `/ips/`

An example body to create an IP for a server:

```json
{
    "server_id": "VtkBfSnG",
    "ip": "127.0.0.1",
    "is_main": 1,
    "is_ssh": 1
}
```

#### Fetch & update GEO data for an IP address

`POST` `/ips/{ipAddress}/geo`

#### Destroy an Ip address

`DELETE` `/ips/{ipAddress}`

---

<a name="pings"></a>

## Pings

comment

### Ping API calls

#### Get all pings

`GET` `/pings/`

#### Get a specific ping with its relations

`GET` `/pings/{ping}`

#### Destroy a ping

`DELETE` `/pings/{ping}`

---

<a name="pinggroups"></a>

## Ping groups

### Ping groups API calls

#### Get all ping groups

`GET` `/ping-groups/`

#### Get a ping group with relations (assigned & servers)

`GET` `/ping-groups/{pingGroup}`

#### Update a ping group

`PATCH` `/ping-groups/{pingGroup}`

#### Create a ping group

`POST` `/ping-groups/`

#### Destroy a ping group

`DELETE` `/ping-groups/{pingGroup}`

#### Add server to ping group

`POST` `/ping-groups/{pingGroup}/add/{server}`

#### Remove server from ping group

`DELETE` `/ping-groups/{pingGroup}/remove/{server}`

---

<a name="commands"></a>

## Commands

### Commands API calls

#### Get all commands

`GET` `/commands/`

#### Get an command

`GET` `/commands/{command}`

#### Update a command

`PATCH` `/commands/{command}`

#### Create a command

`POST` `/commands/`

An example body to create a command:

```json
{
    "title": "Get storage info",
    "command": "df -h"
}
```

#### Destroy a command

`DELETE` `/commands/{command}`

---

<a name="commandgroups"></a>

## Command groups

### Command groups API calls

#### Get all command groups

`GET` `/command-groups/`

#### Get a command group with relations

`GET` `/command-groups/{commandGroup}`

#### Update a command group

`PATCH` `/command-groups/{commandGroup}`

#### Create a command group

`POST` `/command-groups/`

#### Destroy a command group

`DELETE` `/command-groups/{commandGroup}`

#### Add connection to command group

`POST` `/command-groups/{commandGroup}/add/{connection}`

#### Remove connection from command group

`DELETE` `/command-groups/{commandGroup}/remove/{connection}`

---

<a name="logs"></a>

## Logs

### Action logs API calls

#### Get all logs

`GET` `/logs/`

#### Get a single log with its relations

`GET` `/logs/{actionLog}`

---

<a name="mysqldump"></a>

## MySQLdump

#### Get all MySQL dumps

`GET` `/mysqldumps/`

#### Get a MySQL dump with its relations

`GET` `/mysqldumps/{mySQLDump}`

#### Run a MySQL dump

`GET` `/mysqldumps/{mySQLDump}/run`

#### Get MySQL dump edit/create parameters

`GET` `/mysqldumps/help`

#### Update a MySQL dump

`PATCH` `/mysqldumps/{mySQLDump}`

#### Create a MySQL dump

`POST` `/mysqldumps/`

#### Destroy a MySQL dump

`DELETE` `/mysqldumps/{mySQLDump}`

---


<a name="downloaded"></a>

## Downloaded files

### Downloaded files API calls

#### Get all downloaded files

`GET` `/downloaded/`

#### Get a downloaded file information

`GET` `/downloaded/{downloadedFile}`

#### Upload a downloaded file to a SFTP connection

`GET` `/downloaded/{downloadedFile}/{sftpConnection}`

```json
{
    "save_as": "/animals/mouse.jpg"
}

```

#### Destroy a downloaded file

`DELETE` `/downloaded/{downloadedFile}`

---

# License

Servyrun is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
