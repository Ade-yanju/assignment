import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  TextInput,
  Dimensions,
  ScrollView,
  ImageSourcePropType,
} from "react-native";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";


const imgCardDisplay = require("./assets/wer.png");
const imgCardPromo = require("./assets/we.png");
const imgCardBranding = require("./assets/w.png");
const imgCardAnnounce = require("./assets/announcement.png");
const imgCapCut = require("./assets/capcut.png");
const imgMobbin = require("./assets/mobbin.png");


type Tab = "smart" | "advanced";

type CardItem = {
  id: string;
  title: string;
  img: ImageSourcePropType;
};


const CARD_ITEMS: CardItem[] = [
  { id: "display", title: "Display", img: imgCardDisplay },
  { id: "promo", title: "Promotion", img: imgCardPromo },
  { id: "branding", title: "Branding", img: imgCardBranding },
  { id: "announce", title: "Announcements", img: imgCardAnnounce },
];

const PROMPT_PLACEHOLDER =
  "stunning promotional image of a\n" +
  "deliciously decorated cake,\n" +
  "emphasizing its layers, frosting, and\n" +
  "toppings in an enticing setting.";

export default function App(): JSX.Element {
  const [activeTab, setActiveTab] = useState<Tab>("smart");
  const [selectedId, setSelectedId] = useState<string>("display");
  const [prompt, setPrompt] = useState<string>(PROMPT_PLACEHOLDER);

  const win = Dimensions.get("window");
  const S = useMemo(() => win.width / 390, [win.width]);

  const cards: CardItem[] = Array.isArray(CARD_ITEMS) ? CARD_ITEMS : [];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.root}>
        
        <View style={styles.topRow}>
          <Ionicons name="close" size={22} color="#fff" />
          <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
            <Feather name="wifi" size={18} color="#fff" />
            <Feather name="battery" size={18} color="#fff" />
          </View>
        </View>

        
        <View style={styles.tabsWrap}>
          <Pressable onPress={() => setActiveTab("smart")} style={styles.tab}>
            <Text
              style={[
                styles.tabText,
                activeTab === "smart" ? styles.tabActive : styles.tabInactive,
              ]}
            >
              Smart script
            </Text>
            {activeTab === "smart" && <View style={styles.tabUnderline} />}
          </Pressable>

          <Pressable onPress={() => setActiveTab("advanced")} style={styles.tab}>
            <Text
              style={[
                styles.tabText,
                activeTab === "advanced" ? styles.tabActive : styles.tabGhost,
              ]}
            >
              Advanced script
            </Text>
          </Pressable>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 28 }}
        >
          <Text style={[styles.question, { marginTop: 16 * S }]}>
            What type of posters do you want to create?
          </Text>

      
          <FlatList<CardItem>
            data={cards}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            style={{ marginTop: 12 }}
            renderItem={({ item }) => {
              const title = typeof item?.title === "string" ? item.title : "";
              const isSelected = selectedId === item?.id;
              return (
                <Pressable
                  onPress={() => setSelectedId(item?.id)}
                  style={[styles.card, isSelected && styles.cardSelected]}
                >
                  <Image source={item?.img} style={styles.cardImg} />
                  <View style={{ height: 6 }} />
                  <Text
                    numberOfLines={1}
                    style={[styles.cardLabel, isSelected && styles.cardLabelActive]}
                  >
                    {title}
                  </Text>
                </Pressable>
              );
            }}
          />

      
          <View style={styles.promptBox}>
            <TextInput
              multiline
              value={prompt}
              onChangeText={setPrompt}
              style={styles.promptText}
              placeholderTextColor="#9BA3AF"
            />
            <Pressable
              style={styles.copyBtn}
              onPress={() => setPrompt((p) => p)}
              accessibilityLabel="Copy prompt"
            >
              <Feather name="copy" size={18} color="#B9C2CE" />
            </Pressable>
          </View>

       
          <Text style={styles.settingsHdr}>Settings</Text>

          <Pressable style={styles.row} accessibilityRole="button">
            <Text style={styles.rowLabel}>Size</Text>
            <View style={styles.rowRight}>
              <Text style={styles.rowValue}>1080 × 1920 px</Text>
              <MaterialIcons name="chevron-right" size={22} color="#A8B1BD" />
            </View>
          </Pressable>

          <Pressable style={styles.row} accessibilityRole="button">
            <Text style={styles.rowLabel}>Category</Text>
            <View style={styles.rowRight}>
              <Text style={styles.rowValue}>Foods and beverage</Text>
              <MaterialIcons name="chevron-right" size={22} color="#A8B1BD" />
            </View>
          </Pressable>

          
          <Pressable style={styles.cta} accessibilityRole="button">
            <View style={styles.ctaDot} />
            <Text style={styles.ctaText}>Generate</Text>
          </Pressable>
        </ScrollView>

        
        <View style={styles.footer}>
          <Image source={imgCapCut} style={{ width: 18, height: 18 }} />
          <Text style={styles.footerText}>CapCut</Text>
          <Text style={[styles.footerText, { opacity: 0.6 }]}>   curated by   </Text>
          <Image
            source={imgMobbin}
            style={{ width: 56, height: 16, resizeMode: "contain" }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#000" },
  root: { flex: 1, backgroundColor: "#000" },

  topRow: {
    height: 44,
    paddingHorizontal: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  tabsWrap: {
    flexDirection: "row",
    gap: 18,
    paddingHorizontal: 16,
    alignItems: "flex-end",
  },
  tab: { paddingVertical: 6 },
  tabText: { fontSize: 16, fontWeight: "600" },
  tabActive: { color: "#fff" },
  tabInactive: { color: "#DDE3EA" },
  tabGhost: { color: "#7E8794" },
  tabUnderline: {
    height: 2,
    backgroundColor: "#3DE0FF",
    marginTop: 6,
    borderRadius: 999,
    width: 70,
  },

  question: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    paddingHorizontal: 16,
  },

  card: {
    width: 108,
    height: 122,
    borderRadius: 12,
    padding: 10,
    marginRight: 10,
    backgroundColor: "#14161A",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  cardSelected: {
    borderColor: "#3DE0FF",
  },
  cardImg: {
    width: "100%",
    height: 78,
    borderRadius: 8,
    resizeMode: "cover",
    backgroundColor: "#0E1116",
  },
  cardLabel: {
    color: "#C9D1DA",
    fontSize: 12,
    fontWeight: "600",
  },
  cardLabelActive: { color: "#fff" },

  promptBox: {
    marginTop: 14,
    marginHorizontal: 16,
    backgroundColor: "#14161A",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    padding: 14,
  },
  promptText: {
    minHeight: 96,
    color: "#E6EEF6",
    fontSize: 14,
    lineHeight: 20,
  },
  copyBtn: {
    position: "absolute",
    right: 12,
    bottom: 12,
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#0E1116",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  settingsHdr: {
    marginTop: 16,
    marginBottom: 6,
    paddingHorizontal: 16,
    color: "#8F99A6",
    fontWeight: "700",
    fontSize: 14,
  },

  row: {
    height: 56,
    marginHorizontal: 16,
    borderRadius: 14,
    backgroundColor: "#0E1116",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  rowLabel: { color: "#E1E8F0", fontWeight: "600", fontSize: 15 },
  rowRight: { flexDirection: "row", alignItems: "center", gap: 6 },
  rowValue: { color: "#9FB0C2", fontSize: 13 },

  cta: {
    height: 54,
    marginTop: 8,
    marginHorizontal: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  ctaDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: "#2EC5FF",
  },
  ctaText: { color: "#000", fontWeight: "800", fontSize: 16, letterSpacing: 0.2 },

  footer: {
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(255,255,255,0.06)",
    backgroundColor: "#2A2A2A",
  },
  footerText: { color: "#DDE4EC", fontSize: 12, fontWeight: "700" },
});
