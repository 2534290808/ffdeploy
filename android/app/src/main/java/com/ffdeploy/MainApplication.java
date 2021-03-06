package com.ffdeploy;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.barcodescanner.RCTZBarCameraPackage;
import it.innove.BleManagerPackage;
import com.cboy.rn.splashscreen.SplashScreenReactPackage;
import com.horcrux.svg.SvgPackage;
import com.rnfs.RNFSPackage;
import com.wheelpicker.WheelPickerPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import org.pgsqlite.SQLitePluginPackage;
import java.util.Arrays;
import java.util.List;
public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RCTZBarCameraPackage(),
            new BleManagerPackage(),
            new SplashScreenReactPackage(),
            new SvgPackage(),
            new RNFSPackage(),
            new WheelPickerPackage(),
            new RCTCameraPackage(),
            new VectorIconsPackage(),new SQLitePluginPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
