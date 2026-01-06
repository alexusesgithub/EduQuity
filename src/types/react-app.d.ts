// This file contains declarations for modules that don't have TypeScript types

declare module 'react-icons/fa' {
  export const FaGraduationCap: React.ComponentType<React.SVGAttributes<SVGElement>>;
  export const FaChalkboardTeacher: React.ComponentType<React.SVGAttributes<SVGElement>>;
  export const FaBook: React.ComponentType<React.SVGAttributes<SVGElement>>;
  export const FaCalendarAlt: React.ComponentType<React.SVGAttributes<SVGElement>>;
  export const FaChartBar: React.ComponentType<React.SVGAttributes<SVGElement>>;
  export const FaBrain: React.ComponentType<React.SVGAttributes<SVGElement>>;
  export const FaSignOutAlt: React.ComponentType<React.SVGAttributes<SVGElement>>;
  export const FaBell: React.ComponentType<React.SVGAttributes<SVGElement>>;
  export const FaRobot: React.ComponentType<React.SVGAttributes<SVGElement>>;
  export const FaChartLine: React.ComponentType<React.SVGAttributes<SVGElement>>;
  export const FaArrowLeft: React.ComponentType<React.SVGAttributes<SVGElement>>;
  export const FaTasks: React.ComponentType<React.SVGAttributes<SVGElement>>;
  export const FaClock: React.ComponentType<React.SVGAttributes<SVGElement>>;
  export const FaUserGraduate: React.ComponentType<React.SVGAttributes<SVGElement>>;
}

// Add React global namespace
declare namespace React {
  interface FormEvent<T = Element> extends SyntheticEvent<T> {
    // Add any properties you need from FormEvent
  }
  
  interface SyntheticEvent<T = Element> {
    bubbles: boolean;
    cancelable: boolean;
    currentTarget: EventTarget & T;
    defaultPrevented: boolean;
    eventPhase: number;
    isTrusted: boolean;
    nativeEvent: Event;
    preventDefault(): void;
    stopPropagation(): void;
    target: EventTarget & T;
    timeStamp: number;
    type: string;
  }
  
  interface EventTarget {}
} 