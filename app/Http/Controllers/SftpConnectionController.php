<?php

namespace App\Http\Controllers;

use App\Models\SftpConnection;
use Illuminate\Http\Request;
use phpseclib3\Net\SFTP;

class SftpConnectionController extends Controller
{
    public function index()
    {
        //
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show(SftpConnection $sftpConnection)
    {
        $this->authorize('view', $sftpConnection);

    }

    public function edit(SftpConnection $sftpConnection)
    {
        $this->authorize('view', $sftpConnection);

    }

    public function update(Request $request, SftpConnection $sftpConnection)
    {
        $this->authorize('update', $sftpConnection);

    }

    public function destroy(SftpConnection $sftpConnection)
    {
        $this->authorize('delete', $sftpConnection);

    }
}
