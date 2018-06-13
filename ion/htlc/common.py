# Copyright (c) 2018 Harry Roberts. All Rights Reserved.
# SPDX-License-Identifier: LGPL-3.0+

import os
import time

ONE_MINUTE = 60
ONE_HOUR = ONE_MINUTE * 60
ONE_DAY = ONE_HOUR * 24
ONE_YEAR = ONE_DAY * 365

DEFAULT_EXPIRY_DURATION = 10 * ONE_MINUTE
MINIMUM_EXPIRY_DURATION = 2 * ONE_MINUTE

def make_htlc_proxy(rpc, contract, account):
    """
    TODO: embed 'abi/HTLC.abi' file in package resources?
    """
    return rpc.proxy('abi/HTLC.abi', contract, account)


def get_default_expiry():
    """
    Default expiry, from now, that a deal should expire
    """
    return int(time.time()) + DEFAULT_EXPIRY_DURATION


def get_random_secret_32():
    """
    Random secret, to be used as the image (revealed later)
    """
    return '0x' + os.urandom(32).encode('hex')
