import 'package:flutter/material.dart';
import 'login.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: StartScreen(),
    );
  }
}

class StartScreen extends StatefulWidget {
  @override
  _StartScreenState createState() => _StartScreenState();
}

class _StartScreenState extends State<StartScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.lightBlue[50], // Background color
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Container(
            width: 350, // Adjust width for the container
            height: 600, // Adjust height to fit content proportionally
            decoration: BoxDecoration(
              border: Border.all(color: Colors.blue, width: 2), // Blue border
              borderRadius: BorderRadius.circular(10), // Rounded corners
            ),
            child: Stack(
              alignment: Alignment.center, // Align elements in the center
              children: [
                Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    // Central circular button with "START" text
                    Container(
                      width: 200,
                      height: 200,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color:
                            Color.fromARGB(255, 106, 103, 103).withOpacity(0.7),
                      ),
                      child: const Center(
                        child: Text(
                          'START',
                          style: TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                            color: Colors.black,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
                const Positioned(
                  top: 30,
                  left: 20,
                  child: Icon(
                    Icons.mail_outline, // Icon in the top left corner
                    size: 30,
                    color: Colors.black,
                  ),
                ),
                const Positioned(
                  bottom: 30,
                  left: 20,
                  child: Row(
                    children: [
                      Icon(
                        Icons.local_hospital, // Icon on the bottom left
                        size: 40,
                        color:
                            Colors.pink, // Matching the color of the ambulance
                      ),
                      SizedBox(width: 10),
                      Text(
                        'LQ-60956', // Text on the bottom right
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: Colors.black,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
