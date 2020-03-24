<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class WalletAction extends Model
{
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'wallet_id',
        'action',
        'change',
        'remaining'
    ];

    // Get the wallet that the wallet action belongs to
    public function wallet()
    {
        return $this->belongsTo(Wallet::class);
    }
}
