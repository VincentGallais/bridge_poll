import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";

const prices = [
  {
    price: "$29.99",
    crossedPrice: "$35.88",
    label: "Yearly",
    description: "Includes Premium Bonus",
  },
  {
    price: "$2.99",
    crossedPrice: "",
    label: "Monthly",
    description: "Includes Premium Bonus",
  },
];

const advantages = [
  { icon: "check-circle", text: "Publication immédiate de vos sondages" },
  { icon: "check-circle", text: "Vos commentaires mis en évidence" },
  { icon: "check-circle", text: "Accès aux sondages de groupe" },
  { icon: "check-circle", text: "Modification d'un vote à tout moment" },
];

export default function Support() {
  const [selected, setSelected] = useState(1);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>👑 Soutenez Bridge Poll</Text>
        <Text style={styles.subtitle}>
          Votre soutien est essentiel pour nous aider à continuer de développer
          l'application sans publicités.
        </Text>

        <View>
          {advantages.map((advantage, index) => (
            <View key={index} style={styles.advantageItem}>
              <FeatherIcon name={advantage.icon} size={24} color="#F82E08" />
              <Text style={styles.advantageText}>{advantage.text}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.form}>
        <View>
          {prices.map((item, index) => {
            const isActive = selected === index;
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => setSelected(index)}
                type="without-feedback"
              >
                <View
                  style={[
                    styles.radio,
                    isActive
                      ? { borderColor: "#F82E08", backgroundColor: "#feeae6" }
                      : {},
                  ]}
                >
                  <FeatherIcon
                    color={isActive ? "#F82E08" : "#363636"}
                    name={isActive ? "check-circle" : "circle"}
                    size={24}
                  />
                  <View style={styles.radioBody}>
                    <View>
                      <Text style={styles.radioLabel}>{item.label}</Text>
                      <Text style={styles.radioText}>{item.description}</Text>
                    </View>
                    {item.crossedPrice ? (
                      <Text style={styles.crossedPrice}>
                        {item.crossedPrice}
                      </Text>
                    ) : null}
                    <Text
                      style={[
                        styles.radioPrice,
                        isActive && styles.radioPriceActive,
                      ]}
                    >
                      {item.price}
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>

        <View>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
          >
            <View style={styles.btn}>
              <Text style={styles.btnText}>Soutenir le projet</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
          >
            <View style={styles.btnEmpty}>
              <Text style={styles.btnEmptyText}>Restore Purchase</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.formFooterText}>
            Plan renews automatically. You can manage and cancel your
            subscription in App Store.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4EFF3",
  },
  header: {
    marginTop: 16,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#181818",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "500",
    color: "#889797",
    marginBottom: 20,
  },
  advantageItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  advantageText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1d1d1d",
    marginLeft: 10,
  },
  form: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginTop: 16,
    marginBottom: 90,
  },
  formFooterText: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: "500",
    color: "#929292",
    textAlign: "center",
  },
  radio: {
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderWidth: 2,
    borderColor: "transparent",
    borderStyle: "solid",
    borderRadius: 24,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  radioBody: {
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  radioLabel: {
    fontSize: 19,
    fontWeight: "700",
    color: "#1d1d1d",
  },
  radioText: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "500",
    color: "#889797",
  },
  radioPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1d1d1d",
  },
  radioPriceActive: {
    transform: [
      {
        scale: 1.2,
      },
    ],
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1,
    backgroundColor: "#F82E08",
    borderColor: "#F82E08",
  },
  btnText: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  btnEmpty: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1.5,
    backgroundColor: "transparent",
    borderColor: "#F82E08",
    marginTop: 12,
  },
  btnEmptyText: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "bold",
    color: "#F82E08",
  },
  crossedPrice: {
    textDecorationLine: "line-through",
    color: "#888",
    fontSize: 16,
    fontWeight: "600",
  },
});
