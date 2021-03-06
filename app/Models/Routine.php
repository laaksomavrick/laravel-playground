<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\RoutineDay;
use App\Models\RoutineSchedule;

class Routine extends Model
{

    protected $fillable = [
        'user_id',
        'name',
        'active'
    ];

    protected $with = ['days.exercises.sets'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function days()
    {
        return $this->hasMany(RoutineDay::class);
    }

    public function schedule()
    {
        return $this->hasOne(RoutineSchedule::class);
    }

}
