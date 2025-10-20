import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter + Laravel',
      home: Scaffold(
        appBar: AppBar(title: const Text('Laravel API 測試')),
        body: const Center(child: ApiTestWidget()),
      ),
    );
  }
}

class ApiTestWidget extends StatefulWidget {
  const ApiTestWidget({super.key});

  @override
  State<ApiTestWidget> createState() => _ApiTestWidgetState();
}

class _ApiTestWidgetState extends State<ApiTestWidget> {
  String result = '等待 API 回應...';

  @override
  void initState() {
    super.initState();
    _fetchApi();
  }

  Future<void> _fetchApi() async {
    try {
      final response = await http.get(Uri.parse('http://127.0.0.1:8000/api/test'));
      if (response.statusCode == 200) {
        setState(() {
          result = jsonDecode(response.body).toString();
        });
      } else {
        setState(() {
          result = '錯誤: ${response.statusCode}';
        });
      }
    } catch (e) {
      setState(() {
        result = '連線錯誤: $e';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Text(result);
  }
}
