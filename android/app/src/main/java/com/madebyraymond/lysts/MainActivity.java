package com.madebyraymond.lysts;

import android.os.Bundle;

import com.reactnativenavigation.NavigationActivity;
import com.zoontek.rnbootsplash.RNBootSplash;

public class MainActivity extends NavigationActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    RNBootSplash.init(R.drawable.bootsplash, MainActivity.this); // <- display the generated bootsplash.xml drawable over our MainActivity
  }  
}
