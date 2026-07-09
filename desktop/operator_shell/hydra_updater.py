import winsparkle

FEED_URL = b"https://raw.githubusercontent.com/Morgenszter/Hydra_Home_Hub/main/installer/update.xml"

def enable_autoupdate() -> None:
    winsparkle.win_sparkle_set_appcast_url(FEED_URL)
    winsparkle.win_sparkle_set_app_details(
        b"Mind Goblin Studios", b"HYDRA Intelligence System", b"8.4.0.0"
    )
    winsparkle.win_sparkle_set_automatic_check_for_updates(True)
    winsparkle.win_sparkle_init()

def manual_check() -> None:
    winsparkle.win_sparkle_check_update_with_ui()
