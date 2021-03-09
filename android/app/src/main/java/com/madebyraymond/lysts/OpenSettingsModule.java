package com.madebyraymond.lysts;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class OpenSettingsModule extends ReactContextBaseJavaModule {

  @Override
  public String getName() {
    /**
     * return the string name of the NativeModule which represents this class in JavaScript
     * In JS access this module through React.NativeModules.OpenSettings
     */
    return "OpenSettings";
  }

  @ReactMethod
  public void openNetworkSettings(Callback cb) {
    Activity currentActivity = getCurrentActivity();

    if (currentActivity == null) {
      cb.invoke(false);
      return;
    }

    try {
      currentActivity.startActivity(new Intent(android.provider.Settings.ACTION_SETTINGS));
      cb.invoke(true);
    } catch (Exception e) {
      cb.invoke(e.getMessage());
    }
  }


  /*This is for open location Settings*/
  @ReactMethod
  public void openLocationSettings(Callback cb) {
    Activity currentActivity = getCurrentActivity();

    if (currentActivity == null) {
      cb.invoke(false);
      return;
    }

    try {
      currentActivity.startActivity(new Intent(android.provider.Settings.ACTION_NETWORK_OPERATOR_SETTINGS));
      cb.invoke(true);
    } catch (Exception e) {
      cb.invoke(e.getMessage());
    }
  }

  @ReactMethod
  public void openNotificationSettings(Callback cb) {
    Activity currentActivity = getCurrentActivity();

    if (currentActivity == null) {
      cb.invoke(false);
      return;
    }

    try {
      currentActivity.startActivity(
        new Intent(android.provider.Settings.ACTION_CHANNEL_NOTIFICATION_SETTINGS)
          .putExtra(android.provider.Settings.EXTRA_APP_PACKAGE, "com.lysts")
          .putExtra(android.provider.Settings.EXTRA_CHANNEL_ID, "lysts-app-channel")
      );
      cb.invoke(true);
    } catch (Exception e) {
      cb.invoke(e.getMessage());
    }
  }

  /* constructor */
  public OpenSettingsModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }
}