<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LocationController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render('Locations/Index', [
            'locations' => Location::where('user_id', \Auth::user()->id)->orWhereNull('user_id')->get(),
            'alert' => \Session::get('alert')
        ]);
    }

    public function create(): \Inertia\Response
    {
        return Inertia::render('Locations/Create', [
            'alert' => \Session::get('alert')
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'city' => 'string|sometimes|nullable|max:125',
            'country' => 'string|required|max:125',
            'lat' => 'numeric|sometimes|nullable',
            'lon' => 'numeric|sometimes|nullable',
        ]);

        try {

            $location = new Location();
            $location->country = $request->country;
            $location->city = $request->city;
            $location->lat = $request->lat;
            $location->lon = $request->lon;
            $location->user_id = \Auth::user()->id;
            $location->save();

        } catch (\Exception $exception) {

            return redirect(route('location.create'))->with(['alert' => ['type' => 'failure', 'message' => 'Location could not be created error ' . $exception->getCode()]]);
        }

        return redirect(route('location.index'))->with(['alert' => ['type' => 'success', 'message' => "Location {$location->city} {$location->country} created successfully"]]);

    }

    public function edit(Location $location): \Inertia\Response
    {
        $this->authorize('update', $location);

        return Inertia::render('Locations/Edit', [
            'resource' => $location,
            'alert' => \Session::get('alert')
        ]);
    }

    public function update(Request $request, Location $location)
    {
        $this->authorize('update', $location);

        $request->validate([
            'city' => 'string|sometimes|nullable|max:125',
            'country' => 'string|required|max:125',
            'lat' => 'numeric|sometimes|nullable',
            'lon' => 'numeric|sometimes|nullable',
        ]);

        try {

            $request->merge(['user_id' => \Auth::user()->id]);

            $location->update($request->all());

        } catch (\Exception $exception) {

            return redirect(route('location.edit', $location))->with(['alert' => ['type' => 'failure', 'message' => 'Location could not be updated error ' . $exception->getCode()]]);
        }

        return redirect(route('location.index'))->with(['alert' => ['type' => 'success', 'message' => "Location {$location->city} {$location->country} updated successfully"]]);

    }

    public function destroy(Location $location)
    {
        $this->authorize('delete', $location);

        try {
            $location->delete();
        } catch (\Exception $exception) {
            return redirect(route('location.edit', $location))->with(['alert' => ['type' => 'failure', 'message' => 'Error deleting: ' . $exception->getMessage()]]);
        }

        return redirect(route('location.index'))->with(['alert' => ['type' => 'success', 'message' => 'Location deleted successfully']]);
    }
}
