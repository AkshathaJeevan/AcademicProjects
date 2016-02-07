package assignment3;

public class Context {
	
	private double input;
	private int distance;
	private double output;
	
	public int getDistance() {
		return distance;
	}
	public void setDistance(int distance) {
		this.distance = distance;
	}

	public Context(int input) { 
        this.input = input; 
        this.output = 0;
    }
	public double getInput() {
		return input;
	}
	public void setInput(double input) {
		this.input = input;
	}
	public double getOutput() {
		return output;
	}
	public void setOutput(double output) {
		this.output = output;
	} 
 

}
