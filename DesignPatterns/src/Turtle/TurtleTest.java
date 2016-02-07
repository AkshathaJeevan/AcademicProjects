package assignment3;

import static org.junit.Assert.*;
import java.io.File;
import org.junit.Test;

public class TurtleTest {

	ClassLoader classLoader = getClass().getClassLoader();
    File file = new File(classLoader.getResource("/Users/kshug1/Documents/commands.txt").getFile());
	    @Test
	    public void testFileExits() throws Exception
	    {
	        assertTrue(file.exists());
	    }
	
	public void testDistance() throws Exception
	{
		assertTrue("45",(file.equals("Move 10"
				+ "penDown"
				+ "Turn 90"
				+ "move 20"
				+ "turn -60"
				+ "move 15"))); {
			}
	}
	public void testRepeat() throws Exception
	{
		assertTrue("30",(file.equals("$length 10"
				+ "penDown"
				+ "repeat 2"
				+ "move $length"
				+ "turn 90"
				+ "end"))); {
			}
	}
	
}