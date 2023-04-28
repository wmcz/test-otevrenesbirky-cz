from app import app
import os

ADMINS = ['root@wikimedia.cz']

if not app.debug:
    import logging
    from logging.handlers import SMTPHandler

    domain = 'test.otevrenesbirky.cz'
    if os.environ.get('OTEVRENESBIRKY_PRODUCTION', 'false').lower() == 'true':
        domain = 'otevrenesbirky.cz'

    mail_handler = SMTPHandler(
        'localhost', 'root@wikimedia.cz',
        ADMINS, '[%s] Application has failed' % domain
    )
    mail_handler.setLevel(logging.ERROR)
    app.logger.addHandler(mail_handler)
