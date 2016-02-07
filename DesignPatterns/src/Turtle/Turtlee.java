package assignment3;


import java.awt.Point;

public class Turtlee {

	private double x;
	private double y;
	private double angle;
	private boolean penPosition;
	private Point location;
	public static boolean PEN_DOWN = true;
	public static boolean PEN_UP = false;

	public Turtlee() {
		x = 0;
		y = 0;
		angle = 0;
		penPosition = PEN_UP;
	}

	public Turtlee( double newX, double newY, double initAngle) {
		x = newX;
		y = newY;
		angle = initAngle;
		penPosition = PEN_UP;
	
	}

	// Move the turtle distance units in the current direction
	public void move(int distance) {
		double radianAngle = Math.toRadians(angle);
		x =  x +   Math.cos(radianAngle) * distance;
		y = y +    Math.sin(radianAngle) * distance;
	
	}

	//   Add “degrees” to the current heading of the turtle.
	public void turn(int degrees) {
		double newAngle = angle + degrees;
		angle = newAngle % 360;
	}

	//lift the Pen up.
	public void penUp() {
		penPosition = PEN_UP;
	}

	//Put the Pen down.
	public void penDown() {
		penPosition = PEN_DOWN;
	}
	//return the x coordinate of this Turtle.
	public double getX() {
		return x;
	}
	//return the y coordinate of this Turtle.
	public double getY() {
		return y;
	}

	public boolean  isPenUp() {
		return penPosition;
	}
	//return the angle to which this Turtle is turned. 
    public double getAngle() {
	return angle;
    }
    
   // Returns the current location of the turtle.
	public Point getLocation() {
		    return location;
		}
	public void setLocation(Point location) {
		    this.location = location;
		}
	// sample client for testing
	public static void main(String[] args) {
		double x0 = 10;
		double y0 = 20;
		double a0 = 30;
		Turtlee turtle = new Turtlee(x0, y0, a0);
		turtle.move(15);
		turtle.turn(90);
		turtle.move(20);
		turtle.turn(-60);
	
	}

}