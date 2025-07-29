// YouTubeFetcher.java
package com.jobscatch.careernavi.util;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.OutputStreamWriter;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class YouTubeFetcher {

    private static final String API_KEY = "AIzaSyCFB_65DpcMv9olxM82RPRuS0nBhoBcw4E";

    public static void main(String[] args) {
        List<String> keywords = List.of("이별을 대처하는 자세", "고백하는법", "권태기극복법", "연애하는법", "썸타는법");
        JSONArray result = new JSONArray();

        for (String keyword : keywords) {
            List<String> videoIds = fetchVideoIds(keyword);
            JSONArray filtered = fetchDetailsAndFilterByViews(videoIds, keyword);
            for (int i = 0; i < filtered.length(); i++) {
                result.put(filtered.getJSONObject(i));
            }
        }

        try (OutputStreamWriter writer = new OutputStreamWriter(
                new FileOutputStream("src/main/resources/recommendations.json"),
                StandardCharsets.UTF_8)) {

            writer.write(result.toString(2));
            System.out.println("✅ recommendations.json 저장 완료 (총 " + result.length() + "개)");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static List<String> fetchVideoIds(String keyword) {
        List<String> ids = new ArrayList<>();
        try {
            String encoded = URLEncoder.encode(keyword, StandardCharsets.UTF_8);
            String url = String.format(
                    "https://www.googleapis.com/youtube/v3/search?key=%s&type=video&part=snippet&q=%s&maxResults=50",
                    API_KEY, encoded
            );

            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder().uri(URI.create(url)).build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            JSONObject json = new JSONObject(response.body());
            JSONArray items = json.getJSONArray("items");

            for (int i = 0; i < items.length(); i++) {
                JSONObject item = items.getJSONObject(i);
                String videoId = item.getJSONObject("id").getString("videoId");
                ids.add(videoId);
            }
        } catch (Exception e) {
            System.out.println("❌ 검색 실패: " + keyword);
            e.printStackTrace();
        }
        return ids;
    }

    private static JSONArray fetchDetailsAndFilterByViews(List<String> videoIds, String keyword) {
        JSONArray result = new JSONArray();
        if (videoIds.isEmpty()) return result;

        try {
            String idParam = videoIds.stream().collect(Collectors.joining(","));
            String url = String.format(
                    "https://www.googleapis.com/youtube/v3/videos?key=%s&part=snippet,statistics&id=%s",
                    API_KEY, idParam
            );

            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder().uri(URI.create(url)).build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            JSONObject json = new JSONObject(response.body());
            JSONArray items = json.getJSONArray("items");

            for (int i = 0; i < items.length(); i++) {
                JSONObject item = items.getJSONObject(i);
                JSONObject snippet = item.getJSONObject("snippet");
                JSONObject statistics = item.getJSONObject("statistics");

                long viewCount = statistics.has("viewCount") ? statistics.getLong("viewCount") : 0;
                if (viewCount < 100000) continue; // 10만 이상 필터

                String title = snippet.getString("title");
                String desc = snippet.getString("description");
                String thumb = snippet.getJSONObject("thumbnails").getJSONObject("default").getString("url");
                String videoId = item.getString("id");

                JSONObject obj = new JSONObject();
                obj.put("platform", "YouTube");
                obj.put("title", title);
                obj.put("url", "https://www.youtube.com/watch?v=" + videoId);
                obj.put("thumbnail", thumb);
                obj.put("description", desc);
                obj.put("tags", List.of("유튜브", keyword));

                result.put(obj);
            }
        } catch (Exception e) {
            System.out.println("❌ 상세조회 실패: " + keyword);
            e.printStackTrace();
        }
        return result;
    }
}