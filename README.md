<p style="text-align: center;">
<img src="https://cdn.write.corbpie.com/wp-content/uploads/2023/02/SurcuriBanner-300x75.png" width="400" height="100" alt="Surcuri banner"/>
</p>

<p style="text-align: center;">

[![Generic badge](https://img.shields.io/badge/version-1.0.0-green.svg)](https://shields.io/)
[![Generic badge](https://img.shields.io/badge/Laravel-10.0-critical.svg)](https://shields.io/)
[![Generic badge](https://img.shields.io/badge/PHP-8.2-blueviolet.svg)](https://shields.io/)
[![Generic badge](https://img.shields.io/badge/React-18.2-9cf.svg)](https://shields.io/)
[![Generic badge](https://img.shields.io/badge/Tailwind-3.2-informational.svg)](https://shields.io/)
<img src="https://cdn.write.corbpie.com/wp-content/uploads/2023/02/AustraliaFlag.png" width="48" height="20"  alt="Australian flag" title="Australian flag"/>

</p>

# About Surcuri

Sucuri is a self-hosted web application built with a backend of PHP Laravel and React + Tailwind CSS for the frontend.
Surcuri allows you to run simple SSH & SFTP commands, do pings between your servers, download, upload & edit files, view
database tables and column structures.

Surcuri was developed to be a multi-user platform, stores passwords encrypted and has an extensive API.

The full features of Surcuri as of February 2023:

- Store Server information
- Store SSH keys
- Run SSH commands
- Store commands
- Store command outputs
- Check if IP address is up
- Ping IP from any added server
- Store IP addresses and get information (GEO, ASN etc).
- Store SFTP connections.
- Download files through SFTP.
- Upload files through SFTP.
- View files through SFTP.
- Edit (smaller) files.

## External services used

* https://ipwhois.io/documentation for IP address GEO data

# API Contents

1. [ Information ](#apiinfo)
2. [ Servers ](#servers)
3. [ Connections ](#connections)
4. [ Keys ](#keys)
5. [ SFTP ](#stp)
6. [ Database Connections ](#databaseconnections)
7. [ Databases ](#databases)
8. [ IP addresses ](#ips)
9. [ Pings ](#pings)
10. [ Ping groups ](#pinggroups)
11. [ Commands ](#commands)
12. [ Command groups ](#commandgroups)
13. [ Logs ](#logs)
14. [ MySQLdump ](#mysqldump)

<a name="apiinfo"></a>

## Information

Get your API token from your profile page: ```/profile```

Your API token must be included in each request header as ```'Authorization: Bearer YOUR_API_TOKEN'```

```'Accept: application/json'``` and ```'Content-Type: application/json'``` are required for requests.

<a name="servers"></a>

## Servers

### Server API calls

#### Get all servers

`GET` `/servers/`

#### Get a server with IPs, location, type and connection

`GET` `/servers/{Server}`

#### Get servers SSH IP

`GET` `/servers/{Server}/ip`

#### Get Servers edit/create parameters

`GET` `/servers/help`

#### Update a server

`PATCH` `/servers/{Server}`

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

#### Destroy a connection

`DELETE` `/connections/{connection}`


---

<a name="keys"></a>

## Keys

comment

### Keys API calls

#### Get all keys

`GET` `/keys/`

#### Get a key with its connection

`GET` `/keys/{key}`

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

#### Create a SFTP connection

`POST` `/sftp/`

#### Destroy a SFTP connection

`DELETE` `/sftp/{sftpConnection}`

---

<a name="databaseconnections"></a>

## Database connections

comment

### Database connections API calls

#### Get all Database connections

`GET` `/db/connections/`

#### Get a database connections with server and key

`GET` `/db/connections/{databaseConnection}`

#### Get database connection edit/create parameters

`GET` `/db/connections/help`

#### Update a database connection

`PATCH` `/db/connections/{databaseConnection}`

#### Create a database connection

`POST` `/db/connections/`

#### Destroy a database connection

`DELETE` `/db/connections/{databaseConnection}`

---

<a name="databases"></a>

## Databases

comment

### Database API calls

#### Get all Databases

`GET` `/db/`

#### Get a database server and key

`GET` `/db/{databaseConnection}`

#### Destroy a database

`DELETE` `/db/{databaseConnection}`

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

#### Destroy an Ip address

`DELETE` `/ips/{ipAddress}`

---

<a name="pings"></a>

## Pings

comment

---

<a name="pinggroups"></a>

## Ping groups

comment

---

<a name="commands"></a>

## Commands

comment

---

<a name="commandgroups"></a>

## Command groups

comment

---

<a name="logs"></a>

## Logs

comment

### Action logs API calls

#### Get all logs

`GET` `/logs/`

#### Get a log

`GET` `/logs/{actionLog}`

---

<a name="mysqldump"></a>

## MySQLdump

comment

---

# License

Surcuri is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
