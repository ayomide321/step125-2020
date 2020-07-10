// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps;

import java.util.Arrays;
import java.util.ArrayList;
import java.util.Collection; 
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

/** This is for testing the capabilities of the Marker Class (not started but did add JUnit to pom.xml)*/
@RunWith(JUnit4.class)
public final class MarkerTest {

  // All the different mock examples of marker info obtained by servlet through POST method or sent by querystring
  private static final String TITLE = "Justice for Breonna Taylor";

  private static final String DESCRIPT = "We will walk to the capital";

  private static final double LAT = 32.565;
  private static final double LONG = 45.8574;

  private static final Marker.Category CAT_A = Marker.Category.BLM;
  private static final Marker.Category CAT_B = Marker.Category.LGBT;
  private static final Marker.Category CAT_C = Marker.Category.Policy;

  private static final String LINK_A = "google.com";
  private static final String LINK_B = "bing.com";

  private static final String FLAG_A = "Hateful message";
  private static final String FLAG_B = "Not real";

  private static final String COMMENT = "What should we bring?";

  @Test
  public void createMarkerWithoutCategories() {
    Set<Marker.Category> CATS = new HashSet<>();
    Set<String> LINKS = new HashSet<>();
        LINKS.add(LINK_A);
        LINKS.add(LINK_B);

    Marker noCatMarker = new Marker(TITLE, DESCRIPT, LAT, LONG, LINKS, CATS);

    Set<Marker.Category> actual = noCatMarker.getCategories();
    Set<Marker.Category> expected = new HashSet<Marker.Category>();
        expected.add(Marker.Category.Other);

    Assert.assertEquals(expected, actual);
  }
  
  @Test
  public void checkUUID() {
    Set<Marker.Category> CATS = new HashSet<>();
        CATS.add(CAT_A);
        CATS.add(CAT_B);
        CATS.add(CAT_C);

    Set<String> LINKS = new HashSet<>();
        LINKS.add(LINK_A);
        LINKS.add(LINK_B);

    Marker marker = new Marker(TITLE, DESCRIPT, LAT, LONG, LINKS, CATS); 

    UUID actual = marker.getUUID();
    UUID not_expected = null;
    
    Assert.assertNotEquals(not_expected, actual); 
  }

  @Test
  public void addReport() {
    Set<Marker.Category> CATS = new HashSet<>();
        CATS.add(CAT_A);
        CATS.add(CAT_B);
        CATS.add(CAT_C);

    Set<String> LINKS = new HashSet<>();
        LINKS.add(LINK_A);
        LINKS.add(LINK_B);

    Marker marker = new Marker(TITLE, DESCRIPT, LAT, LONG, LINKS, CATS);
    marker.addFlagReport(FLAG_A); 

    int actual = marker.getFlags().size();
    int expected = 1;
    
    Assert.assertEquals(expected, actual); 
  }

  @Test
  public void addVotes() {
    Set<Marker.Category> CATS = new HashSet<>();
        CATS.add(CAT_A);
        CATS.add(CAT_B);
        CATS.add(CAT_C);

    Set<String> LINKS = new HashSet<>();
        LINKS.add(LINK_A);
        LINKS.add(LINK_B);

    Marker marker = new Marker(TITLE, DESCRIPT, LAT, LONG, LINKS, CATS);
    marker.addVote();

    int actual = marker.getVotes();
    int expected = 1;
    
    Assert.assertEquals(expected, actual);
  }

  @Test
  public void addComment() {
    Set<Marker.Category> CATS = new HashSet<>();
        CATS.add(CAT_A);
        CATS.add(CAT_B);
        CATS.add(CAT_C);

    Set<String> LINKS = new HashSet<>();
        LINKS.add(LINK_A);
        LINKS.add(LINK_B);

    Marker marker = new Marker(TITLE, DESCRIPT, LAT, LONG, LINKS, CATS);
    marker.addComment(COMMENT);

    int actual = marker.getComments().size();
    int expected = 1;
    
    Assert.assertEquals(expected, actual);
  }
  
}