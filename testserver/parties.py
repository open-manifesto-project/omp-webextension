PARTIES = {
    'pp': ['partido popular', 'populares'],
    'cs': ['ciudadanos', 'cs', 'c\'s'],
    'psoe': ['partido socialista obrero español', 'pspv', 'psoe-a'],
    'up': ['unidas podemos', 'podemos']
}


def read():
    return [PARTIES[key] for key in sorted(PARTIES.keys())]