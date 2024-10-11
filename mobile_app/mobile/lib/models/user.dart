// First, add these dependencies to your pubspec.yaml:
// http: ^0.13.3
// provider: ^6.0.3

// Create a new file: lib/models/user.dart
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:projectnew/register.dart';

class User {
  static const String baseUrl = 'http://localhost:5000/api';

  static Future<Map<String, dynamic>> register({
    required String fullName,
    required String nicNumber,
    required String address,
    required String workPlace,
    required String mobileNumber,
    required String email,
    required String password,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/register'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'fullName': fullName,
          'nicNumber': nicNumber,
          'address': address,
          'workPlace': workPlace,
          'mobileNumber': mobileNumber,
          'email': email,
          'password': password,
        }),
      );

      return jsonDecode(response.body);
    } catch (e) {
      return {'error': e.toString()};
    }
  }

  static Future<Map<String, dynamic>> login({
    required String email,
    required String password,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/login'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'email': email,
          'password': password,
        }),
      );

      return jsonDecode(response.body);
    } catch (e) {
      return {'error': e.toString()};
    }
  }
}

// Modify your RegisterFormScreen class:
class _RegisterFormScreenState extends State<RegisterFormScreen> {
  final _formKey = GlobalKey<FormState>();
  final _fullNameController = TextEditingController();
  final _nicNumberController = TextEditingController();
  final _addressController = TextEditingController();
  final _workPlaceController = TextEditingController();
  final _mobileNumberController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isLoading = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.lightBlue[50],
      body: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20.0),
          child: Container(
            width: 400,
            decoration: BoxDecoration(
              border: Border.all(color: Colors.blue, width: 2),
              borderRadius: BorderRadius.circular(10),
            ),
            padding: const EdgeInsets.all(20),
            child: Form(
              key: _formKey,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  const Text('Register', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 20),
                  _buildTextFormField(_fullNameController, 'Full Name', (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter your full name';
                    }
                    return null;
                  }),
                  _buildTextFormField(_nicNumberController, 'NIC Number', (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter your NIC number';
                    }
                    return null;
                  }),
                  // Add similar TextFormField widgets for other fields
                  
                  ElevatedButton(
                    onPressed: _isLoading ? null : _handleRegister,
                    child: _isLoading 
                      ? CircularProgressIndicator(color: Colors.white)
                      : Text('Register'),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildTextFormField(
    TextEditingController controller,
    String label,
    String? Function(String?) validator,
  ) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: TextFormField(
        controller: controller,
        decoration: InputDecoration(
          labelText: label,
          filled: true,
          fillColor: Colors.blue[900],
          labelStyle: TextStyle(color: Colors.white),
        ),
        style: TextStyle(color: Colors.white),
        validator: validator,
      ),
    );
  }

  Future<void> _handleRegister() async {
    if (_formKey.currentState!.validate()) {
      setState(() => _isLoading = true);
      
      try {
        final response = await User.register(
          fullName: _fullNameController.text,
          nicNumber: _nicNumberController.text,
          address: _addressController.text,
          workPlace: _workPlaceController.text,
          mobileNumber: _mobileNumberController.text,
          email: _emailController.text,
          password: _passwordController.text,
        );

        if (response['error'] == null) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Registration successful')),
          );
          Navigator.pop(context);
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text(response['error'])),
          );
        }
      } finally {
        setState(() => _isLoading = false);
      }
    }
  }
}