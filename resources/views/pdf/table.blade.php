<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
    }

    .table-container {
        background-color: #ffffff;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        max-width: 100%;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        padding-right: 10px;
        text-align: left;
        max-width: 80px;
    }

    th {
        background-color: #f1f1f1;
    }

    tr:nth-child(even) {
        background-color: #f9f9f9;
    }

    tr:hover {
        background-color: #e0e0e0;
    }
</style>
<div class="table-container">
    <table>
        <thead>
        <tr>
            <th>column</th>
            <th>type</th>
            <th>nullable</th>
            <th>key</th>
            <th>default</th>
            <th>extra</th>
        </tr>
        </thead>
        <tbody>
        @foreach($data as $row)
            <tr>
                <td>{{ $row->name }}</td>
                <td>{{ $row->type }}</td>
                <td>{{ $row->is_nullable === 1? 'Y':'N' }}</td>
                <td>{{ $row->key }}</td>
                <td>{{ $row->default }}</td>
                <td>{{ $row->extra }}</td>
            </tr>
        @endforeach
        </tbody>
    </table>
</div>
