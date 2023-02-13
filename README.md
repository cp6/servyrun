<p style="text-align: center;">

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
        <path d="M 54.5,4.5 C 68.4095,3.79664 82.0762,5.29664 95.5,9C 96.4861,19.0842 96.8194,29.2509 96.5,39.5C 93.2234,39.7839 90.0567,39.4505 87,38.5C 85.6667,33.1667 84.3333,27.8333 83,22.5C 71.111,13.1267 58.611,12.2933 45.5,20C 38.8042,28.5158 39.1375,36.8492 46.5,45C 49.3388,46.9203 52.3388,48.5869 55.5,50C 66.8167,53.5496 77.8167,57.8829 88.5,63C 104.035,74.6808 107.201,89.1808 98,106.5C 87.564,117.879 74.564,123.212 59,122.5C 47.2209,121.878 35.7209,119.711 24.5,116C 22.5362,105.76 21.5362,95.2599 21.5,84.5C 25.1667,84.5 28.8333,84.5 32.5,84.5C 33.0878,90.6059 34.2545,96.6059 36,102.5C 49.5481,113.546 64.0481,115.046 79.5,107C 88.8333,97.6667 88.8333,88.3333 79.5,79C 76.6612,77.0797 73.6612,75.4131 70.5,74C 59.1833,70.4504 48.1833,66.1171 37.5,61C 23.9942,49.803 21.1609,36.303 29,20.5C 35.5412,11.9827 44.0412,6.6494 54.5,4.5 Z"/>
    </svg>

</p>

<p style="text-align: center;">

[![Generic badge](https://img.shields.io/badge/version-1.0.0-green.svg)](https://shields.io/)
[![Generic badge](https://img.shields.io/badge/Laravel-10.0-critical.svg)](https://shields.io/)
[![Generic badge](https://img.shields.io/badge/PHP-8.2-blueviolet.svg)](https://shields.io/)
[![Generic badge](https://img.shields.io/badge/React-18.2-9cf.svg)](https://shields.io/)
[![Generic badge](https://img.shields.io/badge/Tailwind-3.2-informational.svg)](https://shields.io/)

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

# Contents

1. [ Servers ](#servers)
2. [ Connections ](#connections)
3. [ Keys ](#keys)
4. [ SFTP ](#stp)
5. [ Databases ](#databases)
6. [ IP addresses ](#ips)
7. [ Pings ](#pings)
8. [ Ping groups ](#pinggroups)
9. [ Commands ](#commands)
10. [ Command groups ](#commandgroups)
11. [ Logs ](#logs)
12. [ MySQLdump ](#mysqldump)
13. [ API ](#api)

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

**Requires 'hostname' parameter**

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

`GET` `/connections/{Connection}`

#### Get connection edit/create parameters

`GET` `/connections/help`

#### Update a connection

`PATCH` `/connections/{Connection}`

#### Create a connection

`POST` `/connections/`

#### Destroy a connection

`DELETE` `/connections/{Connection}`


---

<a name="keys"></a>

## Keys

comment


---

<a name="sftp"></a>

## SFTP

comment

---

<a name="databases"></a>

## Databases

comment

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

<a name="api"></a>

## API

Get your API key from your profile page: ```/profile```

---

# License

Surcuri is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
